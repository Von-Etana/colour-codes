import React from 'react';
import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';

const galleryData: GalleryItem[] = [
  {
    common: 'Brand Strategy',
    binomial: 'Visual Systems & Positioning',
    photo: {
      url: 'https://images.unsplash.com/photo-1542744094-3a3121699563?w=900&auto=format&fit=crop&q=80',
      text: 'Brand strategy presentation meeting',
      pos: '50% 35%',
      by: 'Unsplash'
    }
  },
  {
    common: 'Media Production',
    binomial: 'Commercial Photography & Motion',
    photo: {
      url: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=900&auto=format&fit=crop&q=80',
      text: 'Professional camera setup',
      pos: '50% 50%',
      by: 'Unsplash'
    }
  },
  {
    common: 'Corporate Gifting',
    binomial: 'Executive Merchandise & Packaging',
    photo: {
      url: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=900&auto=format&fit=crop&q=80',
      text: 'Luxury gift box package',
      pos: '50% 50%',
      by: 'Unsplash'
    }
  },
  {
    common: 'Print & Signage',
    binomial: 'Pantone Precision at Scale',
    photo: {
      url: 'https://images.unsplash.com/photo-1562654501-a0ccc0fc3fb1?w=900&auto=format&fit=crop&q=80',
      text: 'Large format printing machine',
      pos: '50% 50%',
      by: 'Unsplash'
    }
  },
  {
    common: 'Corporate Events',
    binomial: 'Summit & Institutional Branding',
    photo: {
      url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&auto=format&fit=crop&q=80',
      text: 'Stage lighting and conference event',
      pos: '50% 40%',
      by: 'Unsplash'
    }
  },
  {
    common: 'Government Parastatals',
    binomial: 'Procurement-Compliant Documentation',
    photo: {
      url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&auto=format&fit=crop&q=80',
      text: 'Modern corporate architecture building',
      pos: '50% 30%',
      by: 'Unsplash'
    }
  },
  {
    common: 'Multinational Ventures',
    binomial: 'Global Standards & Local Resonance',
    photo: {
      url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&auto=format&fit=crop&q=80',
      text: 'Diverse agency team collaborating',
      pos: '50% 50%',
      by: 'Unsplash'
    }
  },
  {
    common: 'Digital Storytelling',
    binomial: 'Interactive Web & Motion Design',
    photo: {
      url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80',
      text: 'Designer working on digital interface',
      pos: '50% 50%',
      by: 'Unsplash'
    }
  }
];

const CircularGalleryDemo = () => {
  return (
    // This outer container provides the scrollable height
    <div className="w-full bg-background text-foreground" style={{ height: '300vh' }}>
      {/* This inner container sticks to the top while scrolling */}
      <div className="w-full h-screen sticky top-0 flex flex-col items-center justify-center overflow-hidden">
        <div className="text-center mb-8 absolute top-16 z-10">
          <h1 className="text-4xl font-bold">Colours & Codes Gallery</h1>
          <p className="text-muted-foreground">Scroll or wait to rotate through our work & expertise</p>
        </div>
        <div className="w-full h-full">
          <CircularGallery items={galleryData} radius={550} autoRotateSpeed={0.03} />
        </div>
      </div>
    </div>
  );
};

export default CircularGalleryDemo;
