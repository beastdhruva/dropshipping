import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Dropship India';
  
  isMenuOpen = false;
  
  contactForm = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  navLinks = [
    { label: 'Why Us?', href: '#features' },
    { label: 'About', href: '#about' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Sourcing', href: '#sourcing' },
    { label: 'Shipping', href: '#shipping' },
    { label: 'Contact', href: '#contact' }
  ];

  features = [
    {
      icon: 'assets/icons/products.svg',
      title: 'Extensive Products',
      description: 'Explore our diverse catalog of high-quality products from trusted suppliers across India.'
    },
    {
      icon: 'assets/icons/sourcing.svg',
      title: 'Direct Sourcing',
      description: 'Get direct access to manufacturers, ensuring the best prices and authentic products.'
    },
    {
      icon: 'assets/icons/integration.svg',
      title: 'Seamless Integration',
      description: 'Easily integrate with your existing systems for streamlined order processing.'
    }
  ];

  aboutCards = [
    {
      icon: 'assets/icons/who.svg',
      title: 'Who We Are',
      description: 'Dropship India, is India\'s fastest-growing dropshipping platform & the smart choice for all eCommerce entrepreneurs.'
    },
    {
      icon: 'assets/icons/scale.svg',
      title: 'Our Scale',
      description: 'Built by professionals, Dropship India currently works with 150+ dropshippers & >40,000 orders daily.'
    },
    {
      icon: 'assets/icons/product.svg',
      title: 'Our Products',
      description: 'Wide range of products with highest profit margins and comprehensive end-to-end order delivery and fulfillment.'
    },
    {
      icon: 'assets/icons/values.svg',
      title: 'Our Values',
      description: 'We pride ourselves on maintaining complete Transparency & Trust in all our business operations.'
    }
  ];

  sourcingCards = [
    {
      icon: 'assets/icons/quick.svg',
      title: 'Quick Sourcing',
      description: 'Fast sourcing service for new products at unbeatable prices across India.'
    },
    {
      icon: 'assets/icons/quality.svg',
      title: 'High Quality Products',
      description: 'Access to 60K+ high quality curated products from verified suppliers.'
    },
    {
      icon: 'assets/icons/network.svg',
      title: 'Top Sellers Network',
      description: 'Sourced from 8,500+ top manufacturers, importers and sellers nationwide.'
    },
    {
      icon: 'assets/icons/pricing.svg',
      title: 'Best Pricing',
      description: 'Minimum 30% better pricing for products vs all other platforms in the market.'
    }
  ];

  shippingCards = [
    {
      icon: 'assets/icons/partner.svg',
      title: 'Trusted Partners',
      description: 'Partnered with Delhivery, Blue Dart, DTDC, and Ekart for reliable shipping across India.'
    },
    {
      icon: 'assets/icons/transport.svg',
      title: 'Road, Rail & Air',
      description: 'Multiple transport capabilities for reducing delivery TATs and ensuring faster reach to customers.'
    },
    {
      icon: 'assets/icons/delivery.svg',
      title: 'Best in Class Delivery',
      description: 'Exceptional performance with 95% orders delivered in less than 5 days nationwide.'
    },
    {
      icon: 'assets/icons/cod.svg',
      title: 'Pan India COD',
      description: 'Seamless COD Remittance with delivery across 27,000+ pincodes throughout India.'
    }
  ];

  partners = ['Delhivery', 'BlueDart', 'Ekart', 'DTDC', 'Xpressbees'];

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  scrollTo(elementId: string): void {
    const element = document.querySelector(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    this.closeMenu();
  }

  submitForm(): void {
    if (this.contactForm.name && this.contactForm.email && this.contactForm.phone && this.contactForm.message) {
      alert('Thank you for your message! We will get back to you soon.');
      this.contactForm = { name: '', email: '', phone: '', message: '' };
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
