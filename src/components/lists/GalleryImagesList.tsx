import { useState, useEffect } from 'react';
import { GalleryImage } from '@/types/gallery-images';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { toast } from 'sonner';
import { 
  MoreHorizontal, 
  Edit, 
  Trash,
  Image as ImageIcon,
  Eye,
  RefreshCw
} from 'lucide-react';
import Image from 'next/image';

interface GalleryImagesListProps {
  departments: { id: string; name: string }[];
  onEdit: (galleryImage: GalleryImage) => void;
}

export function GalleryImagesList({
  departments,
  onEdit,
}: GalleryImagesListProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const fetchImages = async () => {
    try {
      setIsLoading(true);
      let url = '/api/gallery';
      
      if (selectedDept !== 'all') {
        url += `?dept=${selectedDept}`;
      }
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch gallery images');
      }
      
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      toast.error('Failed to load gallery images');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, [selectedDept]);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const response = await fetch(`/api/gallery/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete image');
      }
      
      toast.success('Image deleted successfully');
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Failed to delete image');
    }
  };

  const getDepartmentName = (id: string) => {
    const dept = departments.find(d => d.id === id);
    return dept ? dept.name : id;
  };

  const viewFullImage = (image: GalleryImage) => {
    window.open(image.image_url, '_blank');
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-xl font-semibold">Gallery Images</h2>
        
        <div className="flex items-center gap-2">
          <Select value={selectedDept} onValueChange={setSelectedDept}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            variant="outline" 
            onClick={fetchImages}
            disabled={isLoading}
            className="flex items-center gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-t-2 border-primary rounded-full"></div>
        </div>
      ) : images.length === 0 ? (
        <div className="bg-muted/20 rounded-lg p-8 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/60" />
          <p className="mt-4 text-lg font-medium">No images found</p>
          <p className="text-muted-foreground">Add new images to start building the gallery.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden flex flex-col">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={image.image_url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 bg-black/20 hover:bg-black/40 backdrop-blur-sm text-white rounded-full"
                  onClick={() => viewFullImage(image)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              <CardContent className="pt-4 flex-1">
                <h3 className="font-medium truncate">{image.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {getDepartmentName(image.dept)}
                </p>
                {image.caption && (
                  <p className="mt-1 text-sm line-clamp-2">{image.caption}</p>
                )}
              </CardContent>
              <CardFooter className="pt-0 pb-3 px-4 flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem 
                      onClick={() => viewFullImage(image)}
                      className="cursor-pointer"
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Full Image
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => onEdit(image)}
                      className="cursor-pointer"
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(image.id)}
                      className="text-destructive focus:text-destructive cursor-pointer"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
