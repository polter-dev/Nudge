"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaceLandmarker,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";

export default function VisionTracker() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // UI State
  const [isDistracted, setIsDistracted] = useState(false);
  const [isTaskCompleted, setIsTaskCompleted] = useState(false);

  // Math Loop Refs
  const distractionStartTime = useRef<number | null>(null);
  const isDistractedRef = useRef(false);
  
  // NEW: Focus Tracking Refs
  const focusStartTime = useRef<number | null>(null);
  const lastLoggedSecond = useRef<number>(0);
  const isTaskCompletedRef = useRef(false); 

  // Configuration thresholds
  const YAW_THRESHOLD = 0.25; 
  const PITCH_THRESHOLD = 0.25; 
  const TIME_THRESHOLD_MS = 2000; 
  const FOCUS_REQUIRED_MS = 15000; 

  useEffect(() => {
    let faceLandmarker: FaceLandmarker;
    let animationFrameId: number;

    const initializeMediaPipe = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      faceLandmarker = await FaceLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          delegate: "GPU", 
        },
        outputFaceBlendshapes: true,
        runningMode: "VIDEO",
        numFaces: 1,
      });

      setIsLoaded(true);
      startWebcam();
    };

    const startWebcam = async () => {
      if (!videoRef.current) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480 },
        });
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadeddata", predictWebcam);
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };

    const predictWebcam = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas || !faceLandmarker) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      let lastVideoTime = -1;

      const renderLoop = async () => {
        let startTimeMs = performance.now();
        if (lastVideoTime !== video.currentTime) {
          lastVideoTime = video.currentTime;
          
          const results = faceLandmarker.detectForVideo(video, startTimeMs);

          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const drawingUtils = new DrawingUtils(ctx);

          if (results.faceLandmarks && results.faceLandmarks.length > 0) {
            const landmarks = results.faceLandmarks[0];

            if (!landmarks) return;

            const nose = landmarks[1];
            const top = landmarks[10];
            const bottom = landmarks[152];
            const left = landmarks[234];
            const right = landmarks[454];

            if (!nose || !top || !bottom || !left || !right) return;

            const faceWidth = right.x - left.x;
            const faceHeight = bottom.y - top.y;

            const ratioX = (nose.x - left.x) / faceWidth;
            const ratioY = (nose.y - top.y) / faceHeight;

            const isLookingAway = 
              Math.abs(ratioX - 0.5) > YAW_THRESHOLD || 
              Math.abs(ratioY - 0.5) > PITCH_THRESHOLD;

            if (isLookingAway) {
              // --- DISTRACTION LOGIC ---
              
              // Reset the focus streak because they looked away!
              focusStartTime.current = null;
              lastLoggedSecond.current = 0;

              if (distractionStartTime.current === null) {
                distractionStartTime.current = performance.now();
              } else {
                const timeDistracted = performance.now() - distractionStartTime.current;
                
                if (timeDistracted > TIME_THRESHOLD_MS && !isDistractedRef.current) {
                  isDistractedRef.current = true;
                  setIsDistracted(true);
                  console.log("Distraction Alert Triggered!");
                }
              }
            } else {
              // --- FOCUS LOGIC ---
              
              distractionStartTime.current = null;
              
              if (isDistractedRef.current) {
                isDistractedRef.current = false;
                setIsDistracted(false);
                console.log("User regained focus.");
              }

              // Only track focus if the task isn't already finished
              if (!isTaskCompletedRef.current) {
                if (focusStartTime.current === null) {
                  focusStartTime.current = performance.now();
                }

                // Calculate how long they have been continuously looking
                const focusDuration = performance.now() - focusStartTime.current;
                
                // Convert to whole seconds
                const currentSecond = Math.floor(focusDuration / 1000);

                // If a new second has passed, log it
                if (currentSecond > lastLoggedSecond.current) {
                  lastLoggedSecond.current = currentSecond;
                  console.log(`Focused for ${currentSecond} second(s)...`);
                }

                // Check if they hit the requirement
                if (focusDuration >= FOCUS_REQUIRED_MS) {
                  isTaskCompletedRef.current = true; // Update ref for the loop
                  setIsTaskCompleted(true);          // Update state for UI
                  console.log(`TASK COMPLETED: Looked at screen for ${FOCUS_REQUIRED_MS / 1000} seconds!`);
                  
                  // TODO: Fire off Supabase mutation here to insert into participant_tasks
                }
              }
            }

            for (const faceLandmark of results.faceLandmarks) {
              drawingUtils.drawConnectors(
                faceLandmark,
                FaceLandmarker.FACE_LANDMARKS_TESSELATION,
                { color: "#C0C0C070", lineWidth: 1 }
              );
              drawingUtils.drawConnectors(
                faceLandmark,
                FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
                { color: "#FF3030" }
              );
              drawingUtils.drawConnectors(
                faceLandmark,
                FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
                { color: "#FF3030" }
              );
            }
          }
        }
        animationFrameId = requestAnimationFrame(renderLoop);
      };

      renderLoop();
    };

    initializeMediaPipe();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (faceLandmarker) faceLandmarker.close();
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (isDistracted) {
      document.body.style.backgroundColor = "#b91c1c"; // Tailwind red-700
      document.body.style.transition = "background-color 0.3s ease-in-out";
    } else {
      document.body.style.backgroundColor = "#111827"; // Tailwind gray-900
    }

    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [isDistracted]);

  return (
    <div className={`flex min-h-screen flex-col items-center justify-center p-8 transition-colors duration-500 ${isDistracted ? 'bg-red-700' : 'bg-gray-900'}`}>
      
      {/* Alert / Success Banners */}
      <div className="h-12 mb-4 flex gap-4">
        {isDistracted && (
          <div className="animate-bounce rounded-full bg-red-900 border-2 border-white px-6 py-2 text-white font-bold tracking-wide shadow-2xl shadow-black/50">
            ⚠️ FOCUS LOST - PLEASE LOOK AT SCREEN ⚠️
          </div>
        )}

        {/* NEW: Success Banner */}
        {isTaskCompleted && (
          <div className="rounded-full bg-green-600 border-2 border-white px-6 py-2 text-white font-bold tracking-wide shadow-2xl shadow-green-500/50">
            ✅ TASK COMPLETE: Focus Maintained
          </div>
        )}
      </div>

      <div className={`relative w-[640px] h-[480px] overflow-hidden rounded-2xl bg-black shadow-2xl transition-all duration-500 ${isDistracted ? 'shadow-black/50 ring-8 ring-red-900 scale-105' : isTaskCompleted ? 'ring-4 ring-green-500 shadow-green-500/50' : 'shadow-blue-900/20'}`}>
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center text-white z-10">
            <span className="animate-pulse">Loading AI Model...</span>
          </div>
        )}
        
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className={`absolute top-0 left-0 w-full h-full object-cover -scale-x-100 transition-opacity duration-500 ${isDistracted ? 'opacity-20' : 'opacity-50'}`}
        />
        
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full object-cover z-20 -scale-x-100"
        />
      </div>
      
      <div className="mt-8 text-center text-gray-400">
        <h2 className={`text-xl font-semibold mb-2 transition-colors duration-500 ${isDistracted ? 'text-white' : isTaskCompleted ? 'text-green-400' : 'text-white'}`}>
          {isDistracted ? 'Session Paused' : isTaskCompleted ? 'Task Successfully Logged' : 'Real-Time Focus Tracking'}
        </h2>
        <p className={isDistracted ? 'text-red-200' : 'text-gray-400'}>Using MediaPipe WebAssembly & WebGL</p>
      </div>
    </div>
  );
}