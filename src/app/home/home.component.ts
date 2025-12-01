import { Component, OnInit, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ContentService, SliderImage, Testimonial, Video, Visual } from '../services/content.service';
import { Subscription } from 'rxjs';

@Pipe({
  name: 'safe',
  standalone: true
})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string, type: string): SafeResourceUrl {
    if (type === 'resourceUrl') {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
    return url;
  }
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SafePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  title = 'Poppik Dropshipping';
  mobileMenuOpen = false;
  activeFaq: number | null = null;
  currentSlide = 0;
  slideInterval: any;
  currentTestimonial = 0;
  testimonialOffset = 0;
  showVideoPlayer = false;
  selectedVideo: Video | null = null;
  sliderImages: SliderImage[] = [];
  activeSlides: SliderImage[] = [];
  testimonials: Testimonial[] = [];
  activeTestimonials: Testimonial[] = [];
  videos: Video[] = [];
  activeVideos: Video[] = [];
  visuals: Visual[] = [];
  activeVisuals: Visual[] = [];
  private sliderSubscription?: Subscription;
  private testimonialSubscription?: Subscription;
  private videoSubscription?: Subscription;
  private visualSubscription?: Subscription;

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.sliderSubscription = this.contentService.sliderImages$.subscribe(images => {
      this.sliderImages = images;
      this.activeSlides = images.filter(slide => slide.active);
      if (this.currentSlide >= this.activeSlides.length && this.activeSlides.length > 0) {
        this.currentSlide = 0;
      }
    });

    this.testimonialSubscription = this.contentService.testimonials$.subscribe(testimonials => {
      this.testimonials = testimonials;
      this.activeTestimonials = testimonials.filter(t => t.active);
      if (this.currentTestimonial >= this.activeTestimonials.length && this.activeTestimonials.length > 0) {
        this.currentTestimonial = 0;
      }
      this.updateTestimonialOffset();
    });

    this.videoSubscription = this.contentService.videos$.subscribe(videos => {
      this.videos = videos;
      this.activeVideos = videos.filter(v => v.active);
    });

    this.visualSubscription = this.contentService.visuals$.subscribe(visuals => {
      this.visuals = visuals;
      this.activeVisuals = visuals.filter(v => v.active);
    });

    this.startAutoSlide();
    this.updateTestimonialOffset();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    if (this.sliderSubscription) {
      this.sliderSubscription.unsubscribe();
    }
    if (this.testimonialSubscription) {
      this.testimonialSubscription.unsubscribe();
    }
    if (this.videoSubscription) {
      this.videoSubscription.unsubscribe();
    }
    if (this.visualSubscription) {
      this.visualSubscription.unsubscribe();
    }
  }

  toggleMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleFaq(index: number) {
    if (this.activeFaq === index) {
      this.activeFaq = null;
    } else {
      this.activeFaq = index;
    }
  }

  nextSlide() {
    const totalSlides = this.activeSlides.length || 1;
    this.currentSlide = (this.currentSlide + 1) % totalSlides;
    this.resetAutoSlide();
  }

  previousSlide() {
    const totalSlides = this.activeSlides.length || 1;
    this.currentSlide = (this.currentSlide - 1 + totalSlides) % totalSlides;
    this.resetAutoSlide();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.resetAutoSlide();
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      const totalSlides = this.activeSlides.length || 1;
      this.currentSlide = (this.currentSlide + 1) % totalSlides;
    }, 5000);
  }

  resetAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    this.startAutoSlide();
  }

  nextTestimonial() {
    const total = this.activeTestimonials.length || 1;
    this.currentTestimonial = (this.currentTestimonial + 1) % total;
    this.updateTestimonialOffset();
  }

  previousTestimonial() {
    const total = this.activeTestimonials.length || 1;
    this.currentTestimonial = (this.currentTestimonial - 1 + total) % total;
    this.updateTestimonialOffset();
  }

  updateTestimonialOffset() {
    this.testimonialOffset = -this.currentTestimonial * 33.33;
  }

  openVideoModal(video: Video) {
    this.selectedVideo = video;
    this.showVideoPlayer = true;
  }

  closeVideoModal() {
    this.showVideoPlayer = false;
    this.selectedVideo = null;
  }
}
