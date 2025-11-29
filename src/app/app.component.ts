import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Poppik Dropshipping';
  mobileMenuOpen = false;
  activeFaq: number | null = null;
  currentSlide = 0;
  slideInterval: any;
  currentTestimonial = 0;
  testimonialOffset = 0;

  testimonials = [
    {
      name: 'Customer 1',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      text: 'In my corporate life, confidence is my best accessory — and POPPIK helps me wear it every day!✨The POPPIK HD Foundation gives me a natural, even finish that lasts from meetings to evening events.🌸I love pairing it with the POPPIK Nude Bullet Matte Lipstick for a polished, professional look that feels light yet powerful.💄POPPIK isn\'t just makeup — it\'s my daily dose of confidence and grace'
    },
    {
      name: 'Customer 2',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      text: 'Poppik Dropshipping made it incredibly easy for me to start my own Beauty brand. Zero investment and complete backend support - it\'s a game changer!'
    },
    {
      name: 'Customer 3',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      text: 'The weekly payment settlements are transparent and on time. I love the dashboard - tracking orders is so simple!'
    }
  ];

  ngOnInit() {
    this.startAutoSlide();
    this.updateTestimonialOffset();
  }

  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
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
    this.currentSlide = (this.currentSlide + 1) % 4;
    this.resetAutoSlide();
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + 4) % 4;
    this.resetAutoSlide();
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    this.resetAutoSlide();
  }

  startAutoSlide() {
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % 4;
    }, 5000);
  }

  resetAutoSlide() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
    this.startAutoSlide();
  }

  nextTestimonial() {
    this.currentTestimonial = (this.currentTestimonial + 1) % this.testimonials.length;
    this.updateTestimonialOffset();
  }

  previousTestimonial() {
    this.currentTestimonial = (this.currentTestimonial - 1 + this.testimonials.length) % this.testimonials.length;
    this.updateTestimonialOffset();
  }

  updateTestimonialOffset() {
    this.testimonialOffset = -this.currentTestimonial * 33.33;
  }
}
