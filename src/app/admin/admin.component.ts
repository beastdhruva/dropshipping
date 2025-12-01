import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentService, SliderImage, Testimonial } from '../services/content.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  sidebarCollapsed = false;
  currentPage = 'dashboard';

  showAddSliderModal = false;
  showEditSliderModal = false;
  showAddTestimonialModal = false;
  showEditTestimonialModal = false;
  showAddVideoModal = false;
  showAddVisualModal = false;

  sliderImages: SliderImage[] = [];
  currentSlider: SliderImage | null = null;
  sliderForm = {
    title: '',
    subtitle: '',
    imageUrl: '',
    imageFile: null as File | null
  };

  testimonials: Testimonial[] = [];
  currentTestimonial: Testimonial | null = null;
  testimonialForm = {
    name: '',
    role: '',
    text: '',
    rating: 5,
    product: '',
    imageUrl: '',
    imageFile: null as File | null,
    avatarColor: 'linear-gradient(135deg, #2563eb, #7c3aed)'
  };

  constructor(private contentService: ContentService) {}

  stats = [
    { label: 'Total Orders', value: '1,247', icon: 'orders', change: '+12%', positive: true },
    { label: 'Revenue', value: '₹4,52,890', icon: 'revenue', change: '+8%', positive: true },
    { label: 'Pending Orders', value: '38', icon: 'pending', change: '-5%', positive: true },
    { label: 'Total Products', value: '156', icon: 'products', change: '+3%', positive: true }
  ];

  recentOrders = [
    { id: 'ORD-2024-001', customer: 'Rahul Sharma', product: 'HD Foundation', amount: '₹899', status: 'Delivered', date: '28 Nov 2024' },
    { id: 'ORD-2024-002', customer: 'Priya Patel', product: 'Matte Lipstick Set', amount: '₹1,299', status: 'Shipped', date: '28 Nov 2024' },
    { id: 'ORD-2024-003', customer: 'Amit Kumar', product: 'Skincare Kit', amount: '₹2,499', status: 'Processing', date: '27 Nov 2024' },
    { id: 'ORD-2024-004', customer: 'Sneha Reddy', product: 'Hair Serum', amount: '₹649', status: 'Pending', date: '27 Nov 2024' },
    { id: 'ORD-2024-005', customer: 'Vikram Singh', product: 'Wellness Bundle', amount: '₹3,199', status: 'Delivered', date: '26 Nov 2024' }
  ];

  topProducts = [
    { name: 'HD Foundation', sales: 234, revenue: '₹2,10,366', stock: 45 },
    { name: 'Nude Bullet Matte Lipstick', sales: 189, revenue: '₹1,32,111', stock: 78 },
    { name: 'Skincare Essentials Kit', sales: 156, revenue: '₹3,89,844', stock: 23 },
    { name: 'Hair Growth Serum', sales: 134, revenue: '₹86,966', stock: 156 }
  ];

  ngOnInit() {
    this.contentService.sliderImages$.subscribe(images => {
      this.sliderImages = images;
    });

    this.contentService.testimonials$.subscribe(testimonials => {
      this.testimonials = testimonials;
    });
  }

  oldTestimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Corporate Professional',
      text: 'In my corporate life, confidence is my best accessory — and POPPIK helps me wear it every day! The POPPIK HD Foundation gives me a natural, even finish that lasts from morning meetings to evening events.',
      rating: 4,
      product: 'HD Foundation',
      avatarColor: 'linear-gradient(135deg, #ec4899, #f43f5e)',
      active: true
    },
    {
      id: 2,
      name: 'Ananya Reddy',
      role: 'Beauty Blogger',
      text: 'I have tried countless lipsticks, but POPPIK Matte Lipstick is truly different. The pigmentation is incredible and it stays put for hours without drying out my lips.',
      rating: 5,
      product: 'Matte Lipstick',
      avatarColor: 'linear-gradient(135deg, #2563eb, #7c3aed)',
      active: true
    },
    {
      id: 3,
      name: 'Meera Patel',
      role: 'Wellness Coach',
      text: 'The Skincare Essentials Kit has completely transformed my skincare routine. My skin feels healthier and more radiant than ever before.',
      rating: 5,
      product: 'Skincare Kit',
      avatarColor: 'linear-gradient(135deg, #10b981, #2563eb)',
      active: true
    },
    {
      id: 4,
      name: 'Riya Kapoor',
      role: 'Fashion Influencer',
      text: 'POPPIK products are my go-to for all my photoshoots. The quality is amazing and the results speak for themselves!',
      rating: 4,
      product: 'Complete Makeup Set',
      avatarColor: 'linear-gradient(135deg, #f59e0b, #ef4444)',
      active: false
    }
  ];

  videos = [
    {
      id: 1,
      title: 'How to Apply HD Foundation',
      description: 'Step-by-step tutorial for flawless foundation application',
      duration: '5:32',
      type: 'Tutorial',
      views: '12.5K',
      active: true
    },
    {
      id: 2,
      title: 'Matte Lipstick Swatches',
      description: 'Complete swatch video of all 12 shades in our matte collection',
      duration: '8:15',
      type: 'Product Demo',
      views: '8.2K',
      active: true
    },
    {
      id: 3,
      title: 'Morning Skincare Routine',
      description: 'Complete morning routine using POPPIK skincare products',
      duration: '12:45',
      type: 'Routine',
      views: '25.8K',
      active: true
    },
    {
      id: 4,
      title: 'Bridal Makeup Tutorial',
      description: 'Create stunning bridal look with POPPIK makeup collection',
      duration: '18:20',
      type: 'Tutorial',
      views: '45.3K',
      active: false
    }
  ];

  visuals = [
    {
      id: 1,
      title: 'Product Catalog Overview',
      description: 'Browse through our extensive Beauty, Lifestyle & Wellness product catalog',
      category: 'Catalog',
      gradient: 'linear-gradient(180deg, #e0f2fe 0%, #fce7f3 100%)',
      active: true
    },
    {
      id: 2,
      title: 'Dashboard Interface',
      description: 'See how easy it is to manage your business with our intuitive dashboard',
      category: 'Interface',
      gradient: 'linear-gradient(180deg, #d1fae5 0%, #e0f2fe 100%)',
      active: true
    },
    {
      id: 3,
      title: 'Order Fulfillment Process',
      description: 'Visual guide to how we handle packaging and shipping',
      category: 'Process',
      gradient: 'linear-gradient(180deg, #fef3c7 0%, #fce7f3 100%)',
      active: true
    },
    {
      id: 4,
      title: 'Quality Assurance',
      description: 'Our rigorous quality testing ensures only the best products reach you',
      category: 'Quality',
      gradient: 'linear-gradient(180deg, #ede9fe 0%, #e0f2fe 100%)',
      active: false
    }
  ];

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  setPage(page: string) {
    this.currentPage = page;
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'delivered': return 'status-delivered';
      case 'shipped': return 'status-shipped';
      case 'processing': return 'status-processing';
      case 'pending': return 'status-pending';
      default: return '';
    }
  }

  openAddSliderModal() {
    this.resetSliderForm();
    this.showAddSliderModal = true;
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.sliderForm.imageFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.sliderForm.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  editSlider(slide: SliderImage) {
    this.currentSlider = slide;
    this.sliderForm = {
      title: slide.title || '',
      subtitle: slide.subtitle || '',
      imageUrl: slide.imageUrl,
      imageFile: null
    };
    this.showEditSliderModal = true;
  }

  saveSlider() {
    if (!this.sliderForm.imageUrl) {
      alert('Please upload an image');
      return;
    }

    const newSlide: SliderImage = {
      id: Date.now(),
      title: this.sliderForm.title || undefined,
      subtitle: this.sliderForm.subtitle || undefined,
      imageUrl: this.sliderForm.imageUrl,
      active: true
    };

    this.contentService.addSliderImage(newSlide);
    this.showAddSliderModal = false;
    this.resetSliderForm();
  }

  updateSlider() {
    if (!this.currentSlider) return;

    if (!this.sliderForm.imageUrl) {
      alert('Please upload an image');
      return;
    }

    this.contentService.updateSliderImage(this.currentSlider.id, {
      title: this.sliderForm.title || undefined,
      subtitle: this.sliderForm.subtitle || undefined,
      imageUrl: this.sliderForm.imageUrl
    });

    this.showEditSliderModal = false;
    this.resetSliderForm();
  }

  resetSliderForm() {
    this.sliderForm = {
      title: '',
      subtitle: '',
      imageUrl: '',
      imageFile: null
    };
    this.currentSlider = null;
  }

  closeSliderModal() {
    this.showAddSliderModal = false;
    this.showEditSliderModal = false;
    this.resetSliderForm();
  }

  toggleSliderStatus(slide: SliderImage) {
    this.contentService.toggleSliderStatus(slide.id);
  }

  deleteSlider(slide: SliderImage) {
    if (confirm('Are you sure you want to delete this slide?')) {
      this.contentService.deleteSliderImage(slide.id);
    }
  }

  openAddTestimonialModal() {
    this.resetTestimonialForm();
    this.showAddTestimonialModal = true;
  }

  onTestimonialImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.testimonialForm.imageFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.testimonialForm.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  editTestimonial(testimonial: Testimonial) {
    this.currentTestimonial = testimonial;
    this.testimonialForm = {
      name: testimonial.name,
      role: testimonial.role,
      text: testimonial.text,
      rating: testimonial.rating,
      product: testimonial.product,
      imageUrl: testimonial.imageUrl,
      imageFile: null,
      avatarColor: testimonial.avatarColor
    };
    this.showEditTestimonialModal = true;
  }

  saveTestimonial() {
    if (!this.testimonialForm.name || !this.testimonialForm.text || !this.testimonialForm.imageUrl) {
      alert('Please fill in all required fields');
      return;
    }

    const newTestimonial: Testimonial = {
      id: Date.now(),
      name: this.testimonialForm.name,
      role: this.testimonialForm.role,
      text: this.testimonialForm.text,
      rating: this.testimonialForm.rating,
      product: this.testimonialForm.product,
      imageUrl: this.testimonialForm.imageUrl,
      avatarColor: this.testimonialForm.avatarColor,
      active: true
    };

    this.contentService.addTestimonial(newTestimonial);
    this.showAddTestimonialModal = false;
    this.resetTestimonialForm();
  }

  updateTestimonial() {
    if (!this.currentTestimonial) return;

    if (!this.testimonialForm.name || !this.testimonialForm.text || !this.testimonialForm.imageUrl) {
      alert('Please fill in all required fields');
      return;
    }

    this.contentService.updateTestimonial(this.currentTestimonial.id, {
      name: this.testimonialForm.name,
      role: this.testimonialForm.role,
      text: this.testimonialForm.text,
      rating: this.testimonialForm.rating,
      product: this.testimonialForm.product,
      imageUrl: this.testimonialForm.imageUrl,
      avatarColor: this.testimonialForm.avatarColor
    });

    this.showEditTestimonialModal = false;
    this.resetTestimonialForm();
  }

  resetTestimonialForm() {
    this.testimonialForm = {
      name: '',
      role: '',
      text: '',
      rating: 5,
      product: '',
      imageUrl: '',
      imageFile: null,
      avatarColor: 'linear-gradient(135deg, #2563eb, #7c3aed)'
    };
    this.currentTestimonial = null;
  }

  closeTestimonialModal() {
    this.showAddTestimonialModal = false;
    this.showEditTestimonialModal = false;
    this.resetTestimonialForm();
  }

  toggleTestimonialStatus(testimonial: Testimonial) {
    this.contentService.toggleTestimonialStatus(testimonial.id);
  }

  deleteTestimonial(testimonial: Testimonial) {
    if (confirm('Are you sure you want to delete this testimonial?')) {
      this.contentService.deleteTestimonial(testimonial.id);
    }
  }

  editVideo(video: any) {
    console.log('Edit video:', video);
  }

  toggleVideoStatus(video: any) {
    video.active = !video.active;
  }

  deleteVideo(video: any) {
    const index = this.videos.findIndex(v => v.id === video.id);
    if (index > -1) {
      this.videos.splice(index, 1);
    }
  }

  editVisual(visual: any) {
    console.log('Edit visual:', visual);
  }

  toggleVisualStatus(visual: any) {
    visual.active = !visual.active;
  }

  deleteVisual(visual: any) {
    const index = this.visuals.findIndex(v => v.id === visual.id);
    if (index > -1) {
      this.visuals.splice(index, 1);
    }
  }
}