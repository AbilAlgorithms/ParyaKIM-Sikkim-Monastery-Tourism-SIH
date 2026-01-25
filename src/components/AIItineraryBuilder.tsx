import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { 
  Brain, 
  Clock, 
  Heart, 
  Mountain, 
  Users, 
  Camera, 
  BookOpen, 
  Compass,
  Sparkles,
  MessageCircle,
  Calendar,
  MapPin,
  Star,
  ChevronRight,
  Flower2,
  Circle,
  Sun
} from 'lucide-react';

interface ItineraryStep {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
}

export function AIItineraryBuilder() {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    duration: [3],
    interests: [] as string[],
    mood: '',
    mobility: '',
    spiritualLevel: '',
    groupSize: [2]
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const steps: ItineraryStep[] = [
    { id: 'welcome', title: 'Welcome', description: 'Meet your AI guide', isActive: currentStep === 0, isCompleted: currentStep > 0 },
    { id: 'duration', title: 'Duration', description: 'How long is your journey?', isActive: currentStep === 1, isCompleted: currentStep > 1 },
    { id: 'interests', title: 'Interests', description: 'What calls to your spirit?', isActive: currentStep === 2, isCompleted: currentStep > 2 },
    { id: 'mood', title: 'Mood', description: 'Your spiritual intention', isActive: currentStep === 3, isCompleted: currentStep > 3 },
    { id: 'accessibility', title: 'Accessibility', description: 'Your comfort level', isActive: currentStep === 4, isCompleted: currentStep > 4 },
    { id: 'generate', title: 'Generate', description: 'Create your journey', isActive: currentStep === 5, isCompleted: false }
  ];

  const interestOptions = [
    { id: 'meditation', label: 'Meditation & Mindfulness', icon: <Heart className="w-5 h-5" />, color: 'bg-destructive/10 text-destructive border-destructive/20' },
    { id: 'history', label: 'Ancient History & Stories', icon: <BookOpen className="w-5 h-5" />, color: 'bg-accent/10 text-accent border-accent/20' },
    { id: 'architecture', label: 'Sacred Architecture', icon: <Camera className="w-5 h-5" />, color: 'bg-primary/10 text-primary border-primary/20' },
    { id: 'nature', label: 'Mountain Views & Nature', icon: <Mountain className="w-5 h-5" />, color: 'bg-nature-accent/10 text-nature-accent border-nature-accent/20' },
    { id: 'culture', label: 'Local Culture & Traditions', icon: <Users className="w-5 h-5" />, color: 'bg-primary/10 text-primary border-primary/20' },
    { id: 'adventure', label: 'Trekking & Adventure', icon: <Compass className="w-5 h-5" />, color: 'bg-accent/10 text-accent border-accent/20' }
  ];

  const moodOptions = [
    { value: 'peaceful', label: 'Peaceful Reflection', description: 'Quiet contemplation and inner peace', icon: <Flower2 className="w-6 h-6" />, gradient: 'from-sky-blue to-primary', style: { background: 'linear-gradient(135deg, #4A90E2, #3A7BD5)' } },
    { value: 'spiritual', label: 'Deep Spiritual Journey', description: 'Profound spiritual experiences and growth', icon: <Circle className="w-6 h-6" />, gradient: 'from-primary to-accent', style: { background: 'linear-gradient(135deg, #4A90E2, #F5A623)' } },
    { value: 'cultural', label: 'Cultural Immersion', description: 'Rich traditions and local connections', icon: <Users className="w-6 h-6" />, gradient: 'from-nature-accent to-green-600', style: { background: 'linear-gradient(135deg, #2ECC71, #27AE60)' } },
    { value: 'adventurous', label: 'Adventurous Explorer', description: 'Active exploration and discovery', icon: <Mountain className="w-6 h-6" />, gradient: 'from-accent to-orange-600', style: { background: 'linear-gradient(135deg, #F5A623, #E67E22)' } }
  ];

  const handleInterestToggle = (interestId: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const generateItinerary = async () => {
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      setIsGenerating(false);
      setShowResults(true);
    }, 3000);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="text-center space-y-8">
            <div className="relative">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4A90E2, #F5A623)' }}>
                <Brain className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 animate-bounce">
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <Sparkles className="w-3 h-3 text-primary" />
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-medium text-foreground">Tashi Delek! 🙏</h2>
              <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                I'm your AI spiritual guide. Let's create a personalized journey through Sikkim's sacred monasteries together.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Sun className="w-4 h-4" />
              <span>Powered by AI Wisdom</span>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <Clock className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-medium">How many days do you have?</h2>
              <p className="text-muted-foreground">We'll create the perfect rhythm for your spiritual journey</p>
            </div>
            
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-light text-primary mb-2">{preferences.duration[0]}</div>
                <div className="text-muted-foreground">
                  {preferences.duration[0] === 1 ? 'Day' : 'Days'}
                </div>
              </div>
              
              <div className="px-6">
                <Slider
                  value={preferences.duration}
                  onValueChange={(value) => setPreferences(prev => ({ ...prev, duration: value }))}
                  max={14}
                  min={1}
                  step={1}
                  className="w-full"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div className="text-center">
                  <div>1-3 days</div>
                  <div>Quick Blessing</div>
                </div>
                <div className="text-center">
                  <div>4-7 days</div>
                  <div>Deep Immersion</div>
                </div>
                <div className="text-center">
                  <div>8+ days</div>
                  <div>Spiritual Retreat</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <Heart className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-medium">What calls to your spirit?</h2>
              <p className="text-muted-foreground">Select all interests that resonate with you</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {interestOptions.map((option) => {
                const isSelected = preferences.interests.includes(option.id);
                return (
                  <button
                    key={option.id}
                    onClick={() => handleInterestToggle(option.id)}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${
                      isSelected 
                        ? 'border-primary bg-primary/5 shadow-lg' 
                        : 'border-border hover:border-primary/30 bg-card hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-xl ${option.color}`}>
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                          {option.label}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <Circle className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-medium">What's your spiritual intention?</h2>
              <p className="text-muted-foreground">Choose the energy that guides your journey</p>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {moodOptions.map((option) => {
                const isSelected = preferences.mood === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setPreferences(prev => ({ ...prev, mood: option.value }))}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      isSelected 
                        ? 'border-primary bg-primary/5 shadow-lg' 
                        : 'border-border hover:border-primary/30 bg-card hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 rounded-xl text-white" style={option.style}>
                        {option.icon}
                      </div>
                      <div className="flex-1">
                        <div className={`font-medium text-lg mb-1 ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                          {option.label}
                        </div>
                        <div className="text-sm text-muted-foreground leading-relaxed">
                          {option.description}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <Mountain className="w-12 h-12 mx-auto text-primary" />
              <h2 className="text-2xl font-medium">What's your comfort level?</h2>
              <p className="text-muted-foreground">We'll match monasteries to your mobility needs</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {[
                { value: 'high', label: 'High Mobility', description: 'Ready for challenging treks and steep paths', icon: '🥾' },
                { value: 'moderate', label: 'Moderate Mobility', description: 'Comfortable with gentle walks and moderate climbing', icon: '🚶' },
                { value: 'low', label: 'Low Mobility', description: 'Prefer easily accessible locations', icon: '🛤️' },
                { value: 'assisted', label: 'Assisted Access', description: 'Require accessibility accommodations', icon: '♿' }
              ].map((option) => {
                const isSelected = preferences.mobility === option.value;
                return (
                  <button
                    key={option.value}
                    onClick={() => setPreferences(prev => ({ ...prev, mobility: option.value }))}
                    className={`p-4 rounded-2xl border-2 transition-all text-left ${
                      isSelected 
                        ? 'border-primary bg-primary/5 shadow-lg' 
                        : 'border-border hover:border-primary/30 bg-card hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{option.icon}</div>
                      <div className="flex-1">
                        <div className={`font-medium ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                          {option.label}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {option.description}
                        </div>
                      </div>
                      {isSelected && (
                        <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            {!isGenerating && !showResults && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #4A90E2, #F5A623)' }}>
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-medium mb-2">Ready to create your journey?</h2>
                  <p className="text-muted-foreground">Our AI will craft a personalized spiritual experience just for you</p>
                </div>
                
                <div className="bg-muted/50 rounded-2xl p-6 space-y-4">
                  <h3 className="font-medium">Your Journey Summary:</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Duration:</span>
                      <div className="font-medium">{preferences.duration[0]} days</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Interests:</span>
                      <div className="font-medium">{preferences.interests.length} selected</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Intention:</span>
                      <div className="font-medium">{preferences.mood || 'Not set'}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Mobility:</span>
                      <div className="font-medium">{preferences.mobility || 'Not set'}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isGenerating && (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center animate-pulse" style={{ background: 'linear-gradient(135deg, #4A90E2, #F5A623)' }}>
                  <Brain className="w-8 h-8 text-white animate-bounce" />
                </div>
                <div>
                  <h2 className="text-2xl font-medium mb-2">Creating your spiritual journey...</h2>
                  <p className="text-muted-foreground mb-4">Our AI is analyzing thousands of possibilities</p>
                  <Progress value={66} className="w-full max-w-xs mx-auto" />
                </div>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div>✓ Matching monasteries to your interests</div>
                  <div>✓ Optimizing routes for accessibility</div>
                  <div className="animate-pulse">⏳ Crafting spiritual experiences...</div>
                </div>
              </div>
            )}

            {showResults && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#2ECC71' }}>
                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-medium mb-2">Your Sacred Journey Awaits!</h2>
                  <p className="text-muted-foreground">We've crafted a personalized {preferences.duration[0]}-day spiritual experience</p>
                </div>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Peaceful Mountain Retreat</h3>
                      <Badge variant="secondary" style={{ backgroundColor: 'rgba(245, 166, 35, 0.2)', color: '#F5A623' }}>
                        <Star className="w-3 h-3 mr-1" />
                        Perfect Match
                      </Badge>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>3 monasteries • Rumtek → Enchey → Pemayangtse</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>Morning meditations • Afternoon explorations</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mountain className="w-4 h-4 text-primary" />
                        <span>Gentle walks • Scenic viewpoints</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-lg rounded-2xl"
                  size="lg"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Start Your Journey
                </Button>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (showResults) {
    return (
      <section className="py-8 bg-background min-h-screen">
        <div className="container mx-auto px-4 max-w-md">
          {renderStepContent()}
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 bg-background min-h-screen">
      <div className="container mx-auto px-4 max-w-md">
        {/* Interactive Progress Journey */}
        <div className="relative mb-12">
          {/* Progress Trail */}
          <div className="absolute top-6 left-0 right-0 h-0.5 bg-gradient-to-r from-muted via-primary/30 to-muted"></div>
          <div 
            className="absolute top-6 left-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-700 ease-out"
            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          ></div>
          
          <div className="flex items-center justify-between relative">
            {steps.map((step, index) => {
              const isClickable = index <= currentStep;
              return (
                <div 
                  key={step.id} 
                  className={`flex flex-col items-center space-y-3 cursor-pointer transition-all duration-300 ${
                    isClickable ? 'hover:scale-105' : 'cursor-not-allowed'
                  }`}
                  onClick={() => isClickable && setCurrentStep(index)}
                >
                  {/* Step Circle with Animation */}
                  <div className="relative">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-medium transition-all duration-500 transform ${
                      step.isCompleted 
                        ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg scale-110' 
                        : step.isActive 
                          ? 'bg-gradient-to-br from-accent to-primary text-white shadow-xl scale-125 animate-pulse' 
                          : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}>
                      {step.isCompleted ? (
                        <div className="animate-bounce">✓</div>
                      ) : step.isActive ? (
                        <div className="relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-30"></span>
                          <span className="relative">{index + 1}</span>
                        </div>
                      ) : (
                        index + 1
                      )}
                    </div>
                    
                    {/* Progress Ring for Current Step */}
                    {step.isActive && (
                      <div className="absolute inset-0 rounded-full border-2 border-accent animate-spin" 
                           style={{ animationDuration: '3s' }}></div>
                    )}
                  </div>
                  
                  {/* Step Label with Interactive Tooltip */}
                  <div className="relative group">
                    <div className={`text-xs text-center max-w-20 leading-tight transition-colors duration-300 ${
                      step.isActive ? 'text-primary font-semibold' : 
                      step.isCompleted ? 'text-accent font-medium' :
                      'text-muted-foreground hover:text-foreground'
                    }`}>
                      {step.title}
                    </div>
                    
                    {/* Hover Preview Tooltip */}
                    {isClickable && (
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-card text-card-foreground rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                        <div className="text-xs font-medium">{step.description || `Step ${index + 1}: ${step.title}`}</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-card"></div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Journey Completion Celebration */}
          {currentStep === steps.length - 1 && (
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-1 animate-bounce">
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                <span className="text-xs text-accent font-medium">Almost there!</span>
                <Sparkles className="w-4 h-4 text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Step Content Card */}
        <Card className="border-0 shadow-xl mb-8 overflow-hidden relative group">
          {/* Gradient Border Animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-lg"></div>
          <div className="absolute inset-[1px] bg-card rounded-lg"></div>
          
          <CardContent className="p-8 relative z-10">
            {/* Step Progress Indicator */}
            <div className="flex items-center justify-between mb-6">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                <Brain className="w-3 h-3 mr-1" />
                Step {currentStep + 1} of {steps.length}
              </Badge>
              <div className="flex items-center space-x-2">
                <div className="w-12 h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-700"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {Math.round(((currentStep + 1) / steps.length) * 100)}%
                </span>
              </div>
            </div>
            
            {/* Dynamic Content with Slide Animation */}
            <div className="transform transition-all duration-500 ease-out">
              {renderStepContent()}
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Navigation with Gesture Hints */}
        {!isGenerating && !showResults && (
          <div className="space-y-4">
            {/* Navigation Buttons */}
            <div className="flex space-x-4">
              {currentStep > 0 && (
                <Button
                  onClick={prevStep}
                  variant="outline"
                  size="lg"
                  className="flex-1 py-4 rounded-2xl border-2 hover:border-primary hover:bg-primary/5 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 mr-2 rotate-180 group-hover:-translate-x-1 transition-transform duration-200" />
                    Back
                  </div>
                </Button>
              )}
              <Button
                onClick={currentStep === 5 ? generateItinerary : nextStep}
                size="lg"
                className={`flex-1 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 ${
                  currentStep === 5 
                    ? 'bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 shadow-lg' 
                    : 'bg-accent hover:bg-accent/90'
                } text-accent-foreground group`}
                disabled={
                  (currentStep === 2 && preferences.interests.length === 0) ||
                  (currentStep === 3 && !preferences.mood) ||
                  (currentStep === 4 && !preferences.mobility)
                }
              >
                {currentStep === 5 ? (
                  <div className="flex items-center justify-center">
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Generate Journey
                    <div className="ml-2 flex space-x-1">
                      <Circle className="w-2 h-2 animate-pulse" />
                      <Circle className="w-2 h-2 animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <Circle className="w-2 h-2 animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                )}
              </Button>
            </div>
            
            {/* Interactive Gesture Hint */}
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-xs text-muted-foreground bg-muted/30 px-3 py-2 rounded-full">
                <div className="w-3 h-3 rounded-full bg-primary/30 animate-ping"></div>
                <span>Swipe or tap to navigate</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-1 h-1 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-1 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}