import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentService, SliderImage, Testimonial } from '../services/content.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
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
  sliderImages: SliderImage[] = [];
  activeSlides: SliderImage[] = [];
  testimonials: Testimonial[] = [];
  activeTestimonials: Testimonial[] = [];
  private sliderSubscription?: Subscription;
  private testimonialSubscription?: Subscription;

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
}
