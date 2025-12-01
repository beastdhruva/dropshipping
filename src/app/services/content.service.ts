
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface SliderImage {
  id: number;
  title?: string;
  subtitle?: string;
  imageUrl: string;
  active: boolean;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  text: string;
  rating: number;
  product: string;
  imageUrl: string;
  avatarColor: string;
  active: boolean;
}

export interface Video {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl?: string;
  duration?: string;
  category: string;
  active: boolean;
}

export interface Visual {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  active: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private sliderImagesSubject = new BehaviorSubject<SliderImage[]>([
    { 
      id: 1, 
      title: 'Beauty & Wellness Products', 
      subtitle: 'Discover premium quality beauty essentials for your daily routine',
      imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200',
      active: true
    },
    { 
      id: 2, 
      title: 'Lifestyle Collections', 
      subtitle: 'Explore modern lifestyle products for everyday comfort',
      imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200',
      active: true
    },
    { 
      id: 3, 
      title: 'Premium Quality', 
      subtitle: 'Experience excellence with our curated product range',
      imageUrl: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=1200',
      active: true
    }
  ]);

  sliderImages$ = this.sliderImagesSubject.asObservable();

  private testimonialsSubject = new BehaviorSubject<Testimonial[]>([
    {
      id: 1,
      name: 'Customer 1',
      role: 'Corporate Professional',
      text: 'In my corporate life, confidence is my best accessory — and POPPIK helps me wear it every day!✨The POPPIK HD Foundation gives me a natural, even finish that lasts from meetings to evening events.🌸I love pairing it with the POPPIK Nude Bullet Matte Lipstick for a polished, professional look that feels light yet powerful.💄POPPIK isn\'t just makeup — it\'s my daily dose of confidence and grace',
      rating: 4,
      product: 'HD Foundation',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      avatarColor: 'linear-gradient(135deg, #ec4899, #f43f5e)',
      active: true
    },
    {
      id: 2,
      name: 'Customer 2',
      role: 'Beauty Enthusiast',
      text: 'Poppik Dropshipping made it incredibly easy for me to start my own Beauty brand. Zero investment and complete backend support - it\'s a game changer!',
      rating: 5,
      product: 'Matte Lipstick',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      avatarColor: 'linear-gradient(135deg, #2563eb, #7c3aed)',
      active: true
    },
    {
      id: 3,
      name: 'Customer 3',
      role: 'Wellness Coach',
      text: 'The weekly payment settlements are transparent and on time. I love the dashboard - tracking orders is so simple!',
      rating: 5,
      product: 'Skincare Kit',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      avatarColor: 'linear-gradient(135deg, #10b981, #2563eb)',
      active: true
    }
  ]);

  testimonials$ = this.testimonialsSubject.asObservable();

  private videosSubject = new BehaviorSubject<Video[]>([
    {
      id: 1,
      title: 'Getting Started with Poppik Dropshipping',
      description: 'A complete guide to setting up your first dropshipping store',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '5:32',
      category: 'Tutorial',
      active: true
    },
    {
      id: 2,
      title: 'How to Use Your Dashboard',
      description: 'Navigate through your business dashboard like a pro',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '8:15',
      category: 'Guide',
      active: true
    },
    {
      id: 3,
      title: 'Marketing Strategies for Success',
      description: 'Proven techniques to drive traffic and sales',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '12:45',
      category: 'Marketing',
      active: true
    },
    {
      id: 4,
      title: 'Understanding Weekly Settlements',
      description: 'Learn how payments work and track your earnings',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      duration: '6:20',
      category: 'Finance',
      active: true
    }
  ]);

  videos$ = this.videosSubject.asObservable();

  private visualsSubject = new BehaviorSubject<Visual[]>([
    {
      id: 1,
      title: 'Product Catalog Overview',
      description: 'Browse through our extensive Beauty, Lifestyle & Wellness product catalog',
      imageUrl: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
      category: 'Catalog',
      active: true
    },
    {
      id: 2,
      title: 'Dashboard Interface',
      description: 'See how easy it is to manage your business with our intuitive dashboard',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
      category: 'Interface',
      active: true
    },
    {
      id: 3,
      title: 'Order Fulfillment Process',
      description: 'Visual guide to how we handle packaging and shipping',
      imageUrl: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=800',
      category: 'Process',
      active: true
    },
    {
      id: 4,
      title: 'Quality Assurance',
      description: 'Our rigorous quality testing ensures only the best products reach you',
      imageUrl: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800',
      category: 'Quality',
      active: false
    }
  ]);

  visuals$ = this.visualsSubject.asObservable();

  getSliderImages(): SliderImage[] {
    return this.sliderImagesSubject.value;
  }

  getActiveSliderImages(): SliderImage[] {
    return this.sliderImagesSubject.value.filter(slide => slide.active);
  }

  updateSliderImages(images: SliderImage[]): void {
    this.sliderImagesSubject.next(images);
  }

  addSliderImage(image: SliderImage): void {
    const current = this.sliderImagesSubject.value;
    this.sliderImagesSubject.next([...current, image]);
  }

  updateSliderImage(id: number, updatedImage: Partial<SliderImage>): void {
    const current = this.sliderImagesSubject.value;
    const index = current.findIndex(img => img.id === id);
    if (index > -1) {
      current[index] = { ...current[index], ...updatedImage };
      this.sliderImagesSubject.next([...current]);
    }
  }

  deleteSliderImage(id: number): void {
    const current = this.sliderImagesSubject.value;
    this.sliderImagesSubject.next(current.filter(img => img.id !== id));
  }

  toggleSliderStatus(id: number): void {
    const current = this.sliderImagesSubject.value;
    const index = current.findIndex(img => img.id === id);
    if (index > -1) {
      current[index].active = !current[index].active;
      this.sliderImagesSubject.next([...current]);
    }
  }

  // Testimonial methods
  getTestimonials(): Testimonial[] {
    return this.testimonialsSubject.value;
  }

  getActiveTestimonials(): Testimonial[] {
    return this.testimonialsSubject.value.filter(t => t.active);
  }

  addTestimonial(testimonial: Testimonial): void {
    const current = this.testimonialsSubject.value;
    this.testimonialsSubject.next([...current, testimonial]);
  }

  updateTestimonial(id: number, updatedTestimonial: Partial<Testimonial>): void {
    const current = this.testimonialsSubject.value;
    const index = current.findIndex(t => t.id === id);
    if (index > -1) {
      current[index] = { ...current[index], ...updatedTestimonial };
      this.testimonialsSubject.next([...current]);
    }
  }

  deleteTestimonial(id: number): void {
    const current = this.testimonialsSubject.value;
    this.testimonialsSubject.next(current.filter(t => t.id !== id));
  }

  toggleTestimonialStatus(id: number): void {
    const current = this.testimonialsSubject.value;
    const index = current.findIndex(t => t.id === id);
    if (index > -1) {
      current[index].active = !current[index].active;
      this.testimonialsSubject.next([...current]);
    }
  }

  // Video methods
  getVideos(): Video[] {
    return this.videosSubject.value;
  }

  getActiveVideos(): Video[] {
    return this.videosSubject.value.filter(v => v.active);
  }

  addVideo(video: Video): void {
    const current = this.videosSubject.value;
    this.videosSubject.next([...current, video]);
  }

  updateVideo(id: number, updatedVideo: Partial<Video>): void {
    const current = this.videosSubject.value;
    const index = current.findIndex(v => v.id === id);
    if (index > -1) {
      current[index] = { ...current[index], ...updatedVideo };
      this.videosSubject.next([...current]);
    }
  }

  deleteVideo(id: number): void {
    const current = this.videosSubject.value;
    this.videosSubject.next(current.filter(v => v.id !== id));
  }

  toggleVideoStatus(id: number): void {
    const current = this.videosSubject.value;
    const index = current.findIndex(v => v.id === id);
    if (index > -1) {
      current[index].active = !current[index].active;
      this.videosSubject.next([...current]);
    }
  }

  // Visual methods
  getVisuals(): Visual[] {
    return this.visualsSubject.value;
  }

  getActiveVisuals(): Visual[] {
    return this.visualsSubject.value.filter(v => v.active);
  }

  addVisual(visual: Visual): void {
    const current = this.visualsSubject.value;
    this.visualsSubject.next([...current, visual]);
  }

  updateVisual(id: number, updatedVisual: Partial<Visual>): void {
    const current = this.visualsSubject.value;
    const index = current.findIndex(v => v.id === id);
    if (index > -1) {
      current[index] = { ...current[index], ...updatedVisual };
      this.visualsSubject.next([...current]);
    }
  }

  deleteVisual(id: number): void {
    const current = this.visualsSubject.value;
    this.visualsSubject.next(current.filter(v => v.id !== id));
  }

  toggleVisualStatus(id: number): void {
    const current = this.visualsSubject.value;
    const index = current.findIndex(v => v.id === id);
    if (index > -1) {
      current[index].active = !current[index].active;
      this.visualsSubject.next([...current]);
    }
  }
}
