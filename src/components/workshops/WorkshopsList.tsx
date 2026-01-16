import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { Workshop } from "@/utils/workshops-utils";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrev, 
  CarouselNext,
  CarouselDots
} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";

interface WorkshopsListProps {
  departmentFilter?: string;
  limit?: number;
  showAddButton?: boolean;
}

export default function WorkshopsList({ 
  departmentFilter, 
  limit, 
  showAddButton = false 
}: WorkshopsListProps) {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchWorkshops = useCallback(async () => {
    try {
      setLoading(true);
      const url = departmentFilter 
        ? `/api/workshops?department=${departmentFilter}${limit ? `&limit=${limit}` : ''}`
        : `/api/workshops${limit ? `?limit=${limit}` : ''}`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch workshops');
      const data = await response.json();
      setWorkshops(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [departmentFilter, limit]);

  useEffect(() => {
    fetchWorkshops();
  }, [fetchWorkshops]);

  const handleOpenDialog = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setDialogOpen(true);
  };

  if (loading) {
    return <div className="py-10 text-center">Loading workshops...</div>;
  }

  if (workshops.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-gray-500 mb-4">No workshops found.</p>
        {showAddButton && (
          <Link 
            href="/admin/workshops/add" 
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Workshop
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="py-6">
      {showAddButton && (
        <div className="mb-6 flex justify-end">
          <Link 
            href="/admin/workshops/add" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Workshop
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workshops.map((workshop) => (
          <div 
            key={workshop.id} 
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => handleOpenDialog(workshop)}
          >
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2 line-clamp-2">{workshop.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {format(new Date(workshop.date_from), 'MMM d, yyyy')} 
                {workshop.date_to && workshop.date_to !== workshop.date_from && 
                  ` - ${format(new Date(workshop.date_to), 'MMM d, yyyy')}`
                }
              </p>
              <p className="text-sm text-gray-800 line-clamp-3">{workshop.description}</p>
            </div>
            {workshop.report_url && (
              <div className="px-4 pb-4">
                <a 
                  href={workshop.report_url}
                  className="text-sm text-blue-600 hover:underline inline-flex items-center"
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Report
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Workshop Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          {selectedWorkshop && (
            <>
              <DialogTitle>{selectedWorkshop.title}</DialogTitle>
              <DialogDescription>
                {format(new Date(selectedWorkshop.date_from), 'MMMM d, yyyy')} 
                {selectedWorkshop.date_to && selectedWorkshop.date_to !== selectedWorkshop.date_from && 
                  ` - ${format(new Date(selectedWorkshop.date_to), 'MMMM d, yyyy')}`
                }
                {selectedWorkshop.dept && ` • ${selectedWorkshop.dept}`}
              </DialogDescription>
              <div className="mt-4 space-y-4">
                <div>
                  <p className="text-gray-800 whitespace-pre-line">{selectedWorkshop.description}</p>
                </div>

                {selectedWorkshop.report_url && (
                  <div>
                    <a 
                      href={selectedWorkshop.report_url}
                      className="text-blue-600 hover:underline inline-flex items-center"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Download Workshop Report
                    </a>
                  </div>
                )}

                {selectedWorkshop.gallery && selectedWorkshop.gallery.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-lg font-medium mb-4">Gallery</h4>
                    <Carousel className="w-full">
                      <CarouselContent>
                        {selectedWorkshop.gallery.map((image, index) => (
                          <CarouselItem key={index}>
                            <div className="relative h-64 md:h-96 w-full">
                              <Image
                                src={image}
                                alt={`Workshop image ${index + 1}`}
                                fill
                                className="object-contain"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrev />
                      <CarouselNext />
                      <CarouselDots />
                    </Carousel>
                  </div>
                )}

                {showAddButton && (
                  <div className="flex justify-end space-x-2 mt-4">
                    <Link 
                      href={`/admin/workshops/edit/${selectedWorkshop.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Edit Workshop
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
