import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { 
  MessageCircle, 
  Mic, 
  MicOff, 
  Send, 
  Volume2, 
  Globe, 
  Bot,
  User,
  Sparkles,
  Heart,
  Mountain,
  Camera,
  MapPin,
  Languages,
  Headphones
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  language?: string;
  audioUrl?: string;
}

interface VoiceVisualization {
  isActive: boolean;
  amplitude: number[];
}

export function AIChat({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Tashi Delek! 🙏 I\'m your AI spiritual guide. How can I help you explore Sikkim\'s sacred monasteries today?',
      timestamp: new Date(),
      language: 'en'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceVisualization, setVoiceVisualization] = useState<VoiceVisualization>({
    isActive: false,
    amplitude: Array(20).fill(0.1)
  });
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
    { code: 'ne', name: 'Nepali', native: 'नेपाली', flag: '🇳🇵' },
    { code: 'lep', name: 'Lepcha', native: 'Lepcha', flag: '🏔️' }
  ];

  const quickActions = [
    { id: 'weather', label: 'Weather Update', icon: <Mountain className="w-4 h-4" /> },
    { id: 'monastery-info', label: 'Monastery Info', icon: <MapPin className="w-4 h-4" /> },
    { id: 'meditation', label: 'Meditation Guide', icon: <Heart className="w-4 h-4" /> },
    { id: 'ar-tour', label: 'AR Experience', icon: <Camera className="w-4 h-4" /> }
  ];

  // Simulate voice visualization
  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setVoiceVisualization(prev => ({
          isActive: true,
          amplitude: prev.amplitude.map(() => Math.random() * 0.8 + 0.2)
        }));
      }, 100);
      return () => clearInterval(interval);
    } else {
      setVoiceVisualization(prev => ({
        ...prev,
        isActive: false,
        amplitude: Array(20).fill(0.1)
      }));
    }
  }, [isRecording]);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date(),
      language: currentLanguage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(content.trim()),
        timestamp: new Date(),
        language: currentLanguage
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getAIResponse = (userInput: string): string => {
    const responses = {
      en: {
        weather: "The current weather in Sikkim is clear with temperatures around 18°C. Perfect conditions for monastery visits! ⛅",
        monastery: "I'd recommend starting with Rumtek Monastery - it's the largest in Sikkim and offers stunning architecture. Would you like directions or AR tour options? 🏛️",
        meditation: "Let's begin with a simple breathing meditation. Find a comfortable position and focus on your breath for 5 minutes. I can guide you through it. 🧘‍♂️",
        default: "That's a wonderful question! Based on your spiritual journey preferences, I suggest exploring the peaceful grounds of Enchey Monastery. It offers beautiful city views and rich cultural heritage. ✨"
      },
      hi: {
        weather: "सिक्किम में मौसम साफ है और तापमान लगभग 18°C है। मठ दर्शन के लिए बहुत अच्छा मौसम है! ⛅",
        monastery: "मैं रुमटेक मठ से शुरुआत करने की सलाह दूंगा - यह सिक्किम का सबसे बड़ा मठ है। क्या आप दिशा या AR टूर विकल्प चाहते हैं? 🏛️",
        meditation: "आइए सरल श्वास ध्यान से शुरुआत करते हैं। आरामदायक स्थिति में बैठें और 5 मिनट अपनी सांस पर ध्यान दें। 🧘‍♂️",
        default: "यह बहुत अच्छा प्रश्न है! आपकी आध्यात्मिक यात्रा के आधार पर, मैं एन्चे मठ की शांत भूमि की खोज का सुझाव देता हूं। ✨"
      }
    };

    const currentLangResponses = responses[currentLanguage as keyof typeof responses] || responses.en;
    
    if (userInput.toLowerCase().includes('weather') || userInput.toLowerCase().includes('मौसम')) {
      return currentLangResponses.weather;
    }
    if (userInput.toLowerCase().includes('monastery') || userInput.toLowerCase().includes('मठ')) {
      return currentLangResponses.monastery;
    }
    if (userInput.toLowerCase().includes('meditation') || userInput.toLowerCase().includes('ध्यान')) {
      return currentLangResponses.meditation;
    }
    
    return currentLangResponses.default;
  };

  const startVoiceRecording = () => {
    setIsRecording(true);
    // Simulate voice recording for 3 seconds
    setTimeout(() => {
      setIsRecording(false);
      sendMessage("What's the weather like for monastery visits today?");
    }, 3000);
  };

  const handleQuickAction = (actionId: string) => {
    const actions = {
      'weather': "What's the weather like for monastery visits today?",
      'monastery-info': "Tell me about Rumtek Monastery",
      'meditation': "Guide me through a meditation session",
      'ar-tour': "How do I start an AR tour?"
    };
    
    sendMessage(actions[actionId as keyof typeof actions] || "Help me plan my visit");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center md:justify-center">
      <div className="w-full max-w-md mx-auto bg-background rounded-t-3xl md:rounded-3xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <CardHeader className="pb-3 border-b flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/api/placeholder/40/40" alt="AI Guide" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                  <Bot className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">AI Spiritual Guide</h3>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Online</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {/* Language Selector */}
              <div className="flex items-center space-x-1">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={currentLanguage === lang.code ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentLanguage(lang.code)}
                    className={`h-8 px-2 text-xs ${
                      currentLanguage === lang.code ? 'bg-primary text-white' : ''
                    }`}
                  >
                    {lang.flag}
                  </Button>
                ))}
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                ✕
              </Button>
            </div>
          </div>
        </CardHeader>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-2 ${
                message.type === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'
              }`}
            >
              <Avatar className="w-8 h-8 flex-shrink-0">
                {message.type === 'ai' ? (
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                    <Bot className="w-4 h-4" />
                  </AvatarFallback>
                ) : (
                  <AvatarFallback className="bg-muted text-xs">
                    <User className="w-4 h-4" />
                  </AvatarFallback>
                )}
              </Avatar>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs opacity-60">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                  {message.type === 'ai' && (
                    <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                      <Volume2 className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white text-xs">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="bg-muted rounded-2xl px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 py-2 border-t bg-muted/30">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.id)}
                className="flex items-center space-x-1 whitespace-nowrap flex-shrink-0 rounded-full"
              >
                {action.icon}
                <span className="text-xs">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Voice Visualization */}
        {isRecording && (
          <div className="px-4 py-3 bg-primary/5 border-t">
            <div className="flex items-center justify-center space-x-1">
              <div className="flex items-end space-x-1 h-8">
                {voiceVisualization.amplitude.map((amplitude, index) => (
                  <div
                    key={index}
                    className="bg-primary rounded-full w-1 transition-all duration-100"
                    style={{ height: `${amplitude * 100}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="text-center mt-2">
              <span className="text-sm text-primary">Listening...</span>
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t flex-shrink-0">
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={`Ask me anything... (${languages.find(l => l.code === currentLanguage)?.native})`}
                className="pr-12 rounded-2xl border-2"
                onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputMessage)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                  {languages.find(l => l.code === currentLanguage)?.flag}
                </Badge>
              </div>
            </div>
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="sm"
              onClick={isRecording ? () => setIsRecording(false) : startVoiceRecording}
              className="w-10 h-10 rounded-full p-0"
            >
              {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
            <Button
              onClick={() => sendMessage(inputMessage)}
              size="sm"
              className="w-10 h-10 rounded-full p-0 bg-primary hover:bg-primary/90"
              disabled={!inputMessage.trim()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Language indicator */}
          <div className="flex items-center justify-center mt-2">
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Languages className="w-3 h-3" />
              <span>Speaking in {languages.find(l => l.code === currentLanguage)?.native}</span>
              <Headphones className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}