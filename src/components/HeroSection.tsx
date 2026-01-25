import { motion } from 'framer-motion';
import image_357914831e8cbfd6655e233bf0ef27ad418fcec1 from "figma:asset/357914831e8cbfd6655e233bf0ef27ad418fcec1.png";
import image_4f430db40c141d42a25277a2001d4b635b9726bb from "figma:asset/4f430db40c141d42a25277a2001d4b635b9726bb.png";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Sparkles,
  MapPin,
  Shield,
  Play,
  ChevronDown,
  Calendar,
  MessageCircle,
} from "lucide-react";

export function HeroSection() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src={image_357914831e8cbfd6655e233bf0ef27ad418fcec1}
            alt="Sikkim Monastery in Himalayan Mountains"
            className="w-full h-full object-cover bg-[rgba(0,0,0,1)]"
            loading="eager"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-5xl mx-auto">
            {/* Subtitle */}

            {/* Main Heading */}
            <motion.h1
              className="text-6xl md:text-8xl lg:text-9xl text-white mb-8 tracking-tight"
              style={{ fontWeight: 300, lineHeight: 0.9 }}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.25, 0.25, 0.25, 1],
                delay: 0.3 
              }}
            >
              <motion.span
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeOut",
                  delay: 0.8 
                }}
              >
                ParyaKIM
              </motion.span>
              <br />
              <motion.span 
                style={{ fontWeight: 600 }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeOut",
                  delay: 1.1 
                }}
              >
                Sikkim
              </motion.span>
            </motion.h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed text-[rgba(255,255,255,0)]">
              Experience ancient monasteries through
              cutting-edge AR technology. Your journey to
              spiritual enlightenment begins here.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-4 text-lg min-w-[200px]"
              >
                Plan Your Journey
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-black px-10 py-4 text-lg min-w-[200px] flex items-center"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Video
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center text-white/70">
            <span className="text-sm mb-2">Explore</span>
            <ChevronDown className="w-6 h-6 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div
                className="text-4xl mb-2"
                style={{ fontWeight: 600, color: "#4A90E2" }}
              >
                200+
              </div>
              <p className="text-muted-foreground">
                Sacred Sites
              </p>
            </div>
            <div>
              <div
                className="text-4xl mb-2"
                style={{ fontWeight: 600, color: "#F5A623" }}
              >
                50K+
              </div>
              <p className="text-muted-foreground">
                Pilgrims Guided
              </p>
            </div>
            <div>
              <div
                className="text-4xl mb-2"
                style={{ fontWeight: 600, color: "#2ECC71" }}
              >
                AR Tours
              </div>
              <p className="text-muted-foreground">
                Immersive Experiences
              </p>
            </div>
            <div>
              <div
                className="text-4xl mb-2"
                style={{ fontWeight: 600, color: "#E74C3C" }}
              >
                24/7
              </div>
              <p className="text-muted-foreground">
                Safety Support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Experiences */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge
              variant="secondary"
              className="mb-4 bg-primary/10 text-primary"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Premium Experiences
            </Badge>
            <h2
              className="text-4xl md:text-5xl mb-6"
              style={{ fontWeight: 300, color: "#1a2332" }}
            >
              Discover Sacred{" "}
              <span style={{ fontWeight: 600 }}>
                Destinations
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Immerse yourself in centuries-old traditions with
              cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1615966193211-0f95039cd7b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtraW0lMjBtb25hc3RlcnklMjBwcmF5ZXIlMjBmbGFnc3xlbnwxfHx8fDE3NTc1MTExODJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Monastery with Prayer Flags"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-white/20 text-white backdrop-blur-sm">
                    AR Tours
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h3
                  className="text-xl mb-3"
                  style={{ fontWeight: 500 }}
                >
                  Interactive Monastery Tours
                </h3>
                <p className="text-muted-foreground mb-4">
                  Experience 360° immersive tours with digital
                  prayer wheels and virtual rituals
                </p>
                <Button variant="outline" size="sm">
                  Explore Now
                </Button>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1746037299553-2134e1aa2e43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMG1vbmFzdGVyeSUyMGJ1ZGRoaXN0fGVufDF8fHx8MTc1NzUxMTE4NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Mountain Monastery Landscape"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-white/20 text-white backdrop-blur-sm">
                    AI Guided
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h3
                  className="text-xl mb-3"
                  style={{ fontWeight: 500 }}
                >
                  Personalized Spiritual Journeys
                </h3>
                <p className="text-muted-foreground mb-4">
                  AI-curated itineraries based on your spiritual
                  goals and meditation preferences
                </p>
                <Button variant="outline" size="sm">
                  Plan Journey
                </Button>
              </div>
            </Card>

            <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWtraW0lMjBmZXN0aXZhbCUyMGN1bHR1cmFsJTIwZXZlbnR8ZW58MXx8fHwxNzU3NTE5Nzc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Cultural Festival"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-white/20 text-white backdrop-blur-sm">
                    Cultural
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h3
                  className="text-xl mb-3"
                  style={{ fontWeight: 500 }}
                >
                  Heritage & Cultural Events
                </h3>
                <p className="text-muted-foreground mb-4">
                  Join festivals, ceremonies, and traditional
                  celebrations throughout the year
                </p>
                <Button variant="outline" size="sm">
                  Explore Events
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}