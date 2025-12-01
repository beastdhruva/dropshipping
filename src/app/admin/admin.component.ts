import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContentService, SliderImage, Testimonial, Video, Visual } from '../services/content.service';

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
  showEditVideoModal = false;
  showAddVisualModal = false;
  showEditVisualModal = false;

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

  videos: Video[] = [];
  currentVideo: Video | null = null;
  videoUploadMethod: 'file' | 'url' = 'url';
  videoForm = {
    title: '',
    description: '',
    videoUrl: '',
    videoFile: null as File | null,
    duration: '',
    category: ''
  };

  visuals: Visual[] = [];
  currentVisual: Visual | null = null;
  visualForm = {
    title: '',
    description: '',
    imageUrl: '',
    imageFile: null as File | null,
    category: ''
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

    this.contentService.videos$.subscribe(videos => {
      this.videos = videos;
    });

    this.contentService.visuals$.subscribe(visuals => {
      this.visuals = visuals;
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

  openAddVideoModal() {
    this.resetVideoForm();
    this.videoUploadMethod = 'url';
    this.showAddVideoModal = true;
  }

  onVideoFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.videoForm.videoFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.videoForm.videoUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onVideoMethodChange() {
    if (this.videoUploadMethod === 'file') {
      this.videoForm.videoUrl = '';
    } else {
      this.videoForm.videoFile = null;
    }
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  editVideo(video: Video) {
    this.currentVideo = video;
    this.videoUploadMethod = video.videoUrl.startsWith('data:') ? 'file' : 'url';
    this.videoForm = {
      title: video.title,
      description: video.description,
      videoUrl: video.videoUrl,
      videoFile: null,
      duration: video.duration || '',
      category: video.category
    };
    this.showEditVideoModal = true;
  }

  saveVideo() {
    if (!this.videoForm.title) {
      alert('Please enter a video title');
      return;
    }

    if (this.videoUploadMethod === 'file' && !this.videoForm.videoFile) {
      alert('Please upload a video file');
      return;
    }

    if (this.videoUploadMethod === 'url' && !this.videoForm.videoUrl) {
      alert('Please enter a video URL');
      return;
    }

    const newVideo: Video = {
      id: Date.now(),
      title: this.videoForm.title,
      description: this.videoForm.description,
      videoUrl: this.videoForm.videoUrl,
      duration: this.videoForm.duration || undefined,
      category: this.videoForm.category,
      active: true
    };

    this.contentService.addVideo(newVideo);
    this.showAddVideoModal = false;
    this.resetVideoForm();
  }

  updateVideo() {
    if (!this.currentVideo) return;

    if (!this.videoForm.title) {
      alert('Please enter a video title');
      return;
    }

    if (this.videoUploadMethod === 'file' && !this.videoForm.videoFile && !this.videoForm.videoUrl) {
      alert('Please upload a video file');
      return;
    }

    if (this.videoUploadMethod === 'url' && !this.videoForm.videoUrl) {
      alert('Please enter a video URL');
      return;
    }

    this.contentService.updateVideo(this.currentVideo.id, {
      title: this.videoForm.title,
      description: this.videoForm.description,
      videoUrl: this.videoForm.videoUrl,
      duration: this.videoForm.duration || undefined,
      category: this.videoForm.category
    });

    this.showEditVideoModal = false;
    this.resetVideoForm();
  }

  resetVideoForm() {
    this.videoForm = {
      title: '',
      description: '',
      videoUrl: '',
      videoFile: null,
      duration: '',
      category: ''
    };
    this.videoUploadMethod = 'url';
    this.currentVideo = null;
  }

  closeVideoModal() {
    this.showAddVideoModal = false;
    this.showEditVideoModal = false;
    this.resetVideoForm();
  }

  toggleVideoStatus(video: Video) {
    this.contentService.toggleVideoStatus(video.id);
  }

  deleteVideo(video: Video) {
    if (confirm('Are you sure you want to delete this video?')) {
      this.contentService.deleteVideo(video.id);
    }
  }

  openAddVisualModal() {
    this.resetVisualForm();
    this.showAddVisualModal = true;
  }

  onVisualImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.visualForm.imageFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.visualForm.imageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  editVisual(visual: Visual) {
    this.currentVisual = visual;
    this.visualForm = {
      title: visual.title,
      description: visual.description,
      imageUrl: visual.imageUrl,
      imageFile: null,
      category: visual.category
    };
    this.showEditVisualModal = true;
  }

  saveVisual() {
    if (!this.visualForm.title || !this.visualForm.imageUrl) {
      alert('Please fill in all required fields');
      return;
    }

    const newVisual: Visual = {
      id: Date.now(),
      title: this.visualForm.title,
      description: this.visualForm.description,
      imageUrl: this.visualForm.imageUrl,
      category: this.visualForm.category,
      active: true
    };

    this.contentService.addVisual(newVisual);
    this.showAddVisualModal = false;
    this.resetVisualForm();
  }

  updateVisual() {
    if (!this.currentVisual) return;

    if (!this.visualForm.title || !this.visualForm.imageUrl) {
      alert('Please fill in all required fields');
      return;
    }

    this.contentService.updateVisual(this.currentVisual.id, {
      title: this.visualForm.title,
      description: this.visualForm.description,
      imageUrl: this.visualForm.imageUrl,
      category: this.visualForm.category
    });

    this.showEditVisualModal = false;
    this.resetVisualForm();
  }

  resetVisualForm() {
    this.visualForm = {
      title: '',
      description: '',
      imageUrl: '',
      imageFile: null,
      category: ''
    };
    this.currentVisual = null;
  }

  closeVisualModal() {
    this.showAddVisualModal = false;
    this.showEditVisualModal = false;
    this.resetVisualForm();
  }

  toggleVisualStatus(visual: Visual) {
    this.contentService.toggleVisualStatus(visual.id);
  }

  deleteVisual(visual: Visual) {
    if (confirm('Are you sure you want to delete this visual?')) {
      this.contentService.deleteVisual(visual.id);
    }
  }
}