import { useState, useRef, useCallback } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Upload, Video, X, Play, Pause, CheckCircle, AlertCircle, Film } from 'lucide-react';

interface VideoUploadProps {
  onVideoUploaded?: (videoFile: File) => void;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  className?: string;
}

export function VideoUpload({ 
  onVideoUploaded, 
  maxSizeMB = 100, 
  acceptedFormats = ['mp4', 'mov', 'avi', 'webm'],
  className = ""
}: VideoUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const validateFile = (file: File): string | null => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    if (!fileExtension || !acceptedFormats.includes(fileExtension)) {
      return `Please upload a video file (${acceptedFormats.join(', ')})`;
    }
    
    if (file.size > maxSizeMB * 1024 * 1024) {
      return `File size must be less than ${maxSizeMB}MB`;
    }
    
    return null;
  };

  const handleFile = useCallback((file: File) => {
    const error = validateFile(file);
    if (error) {
      setUploadStatus('error');
      console.error(error);
      return;
    }

    setVideoFile(file);
    const previewUrl = URL.createObjectURL(file);
    setVideoPreview(previewUrl);
    
    // Simulate upload progress
    setUploadStatus('uploading');
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('success');
          onVideoUploaded?.(file);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  }, [maxSizeMB, acceptedFormats, onVideoUploaded]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, [handleFile]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const clearVideo = () => {
    setVideoFile(null);
    setVideoPreview(null);
    setUploadProgress(0);
    setUploadStatus('idle');
    setIsPlaying(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`w-full max-w-2xl mx-auto ${className}`}>
      <div className="text-center mb-6">
        <Badge variant="secondary" className="mb-4 bg-primary/10 text-primary">
          <Film className="w-4 h-4 mr-2" />
          Share Your Journey
        </Badge>
        <h2 className="text-2xl md:text-3xl mb-3" style={{ fontWeight: 600, color: '#1a2332' }}>
          Upload Monastery Video
        </h2>
        <p className="text-muted-foreground text-lg leading-relaxed">
          Share your spiritual journey and monastery experiences with our community
        </p>
      </div>

      <Card className="border-2 border-dashed border-border hover:border-primary/30 transition-colors">
        <CardContent className="p-8">
          {!videoPreview ? (
            <div
              className={`relative ${dragActive ? 'bg-primary/5 border-primary/30' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileInput}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                
                <h3 className="text-xl mb-3" style={{ fontWeight: 500 }}>
                  Drop your video here, or{' '}
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary hover:text-primary/80"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    browse
                  </Button>
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  Supports {acceptedFormats.join(', ').toUpperCase()} • Max {maxSizeMB}MB
                </p>
                
                <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                  <span>📹 Monastery tours</span>
                  <span>•</span>
                  <span>🙏 Prayer ceremonies</span>
                  <span>•</span>
                  <span>🏔️ Himalayan views</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Video Preview */}
              <div className="relative">
                <video
                  ref={videoRef}
                  src={videoPreview}
                  className="w-full h-64 object-cover rounded-lg"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    size="lg"
                    onClick={toggleVideoPlayback}
                    className="bg-black/50 hover:bg-black/70 text-white rounded-full w-16 h-16 p-0"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6 ml-1" />
                    )}
                  </Button>
                </div>
                
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={clearVideo}
                  className="absolute top-2 right-2 w-8 h-8 p-0 rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* File Info */}
              {videoFile && (
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Video className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">{videoFile.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  
                  {uploadStatus === 'success' && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {uploadStatus === 'error' && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              )}

              {/* Upload Progress */}
              {uploadStatus === 'uploading' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2" />
                </div>
              )}

              {/* Upload Status */}
              {uploadStatus === 'success' && (
                <div className="flex items-center justify-center space-x-2 text-green-600 bg-green-50 rounded-lg p-4">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Video uploaded successfully!</span>
                </div>
              )}

              {uploadStatus === 'error' && (
                <div className="flex items-center justify-center space-x-2 text-red-600 bg-red-50 rounded-lg p-4">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-medium">Upload failed. Please try again.</span>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={clearVideo}
                  className="px-6"
                >
                  Upload Different Video
                </Button>
                {uploadStatus === 'success' && (
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6">
                    Share to Community
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}