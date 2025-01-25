import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  categories = [
    { name: 'Electronics', image: 'assets/electronics.jpg' },
    { name: 'Fashion', image: 'assets/fashion.jpg' },
    { name: 'Home & Living', image: 'assets/home.jpg' },
    { name: 'Beauty', image: 'assets/beauty.jpg' }
  ];

  featuredProducts = [
    { name: 'Smartphone', price: 699, image: 'assets/smartphone.jpg' },
    { name: 'Laptop', price: 999, image: 'assets/laptop.jpg' },
    { name: 'Headphones', price: 199, image: 'assets/headphones.jpg' },
    { name: 'Smart Watch', price: 299, image: 'assets/smartwatch.jpg' }
  ];

  testimonials = [
    'Great service and fast delivery!',
    'The products are amazing, will buy again.',
    'Customer support was very helpful!'
  ];

}
