
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api'; // Change this to your actual API URL

  constructor(private http: HttpClient) {}

  // Slider Images API
  getSliderImages(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/slider-images`);
  }

  addSliderImage(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/slider-images`, formData);
  }

  updateSliderImage(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/slider-images/${id}`, formData);
  }

  deleteSliderImage(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/slider-images/${id}`);
  }

  toggleSliderStatus(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/slider-images/${id}/toggle`, {});
  }

  // Testimonials API
  getTestimonials(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/testimonials`);
  }

  addTestimonial(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/testimonials`, formData);
  }

  updateTestimonial(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/testimonials/${id}`, formData);
  }

  deleteTestimonial(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/testimonials/${id}`);
  }

  toggleTestimonialStatus(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/testimonials/${id}/toggle`, {});
  }

  // Videos API
  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/videos`);
  }

  addVideo(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/videos`, formData);
  }

  updateVideo(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/videos/${id}`, formData);
  }

  deleteVideo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/videos/${id}`);
  }

  toggleVideoStatus(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/videos/${id}/toggle`, {});
  }

  // Visuals API
  getVisuals(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/visuals`);
  }

  addVisual(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/visuals`, formData);
  }

  updateVisual(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/visuals/${id}`, formData);
  }

  deleteVisual(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/visuals/${id}`);
  }

  toggleVisualStatus(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/visuals/${id}/toggle`, {});
  }

  // Dashboard Stats API
  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/dashboard/stats`);
  }

  getRecentOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dashboard/recent-orders`);
  }

  getTopProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/dashboard/top-products`);
  }
}
