import React, { useState, useEffect } from 'react';
import api from '../services/api';
import GlassCard from '../components/ui/GlassCard';
import { Search, MapPin, Star } from 'lucide-react';
import Input from '../components/ui/Input';

const Dashboard = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await api.get('/services');
      // The API returns PagedResponse in data: { data: { content: [...] } }
      if (res.success && res.data && res.data.content) {
        setServices(res.data.content);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.error("Failed to fetch services", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.categoryName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Discover Services</h1>
          <p className="text-slate-500">Find the best local services near you</p>
        </div>
        <div className="w-full md:w-72">
          <Input 
            placeholder="Search by name or category..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map(i => (
            <GlassCard key={i} className="h-64 animate-pulse flex flex-col justify-between">
              <div className="w-full h-32 bg-slate-200 dark:bg-slate-800 rounded-lg mb-4"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
            </GlassCard>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.length === 0 ? (
            <div className="col-span-full text-center py-12 text-slate-500">
              No services found matching your criteria.
            </div>
          ) : (
            filteredServices.map(service => (
              <GlassCard key={service.id} className="flex flex-col h-full hover:-translate-y-1 transition-transform duration-300 cursor-pointer">
                <div className="w-full h-40 bg-slate-200 dark:bg-slate-800 rounded-lg mb-4 overflow-hidden">
                  {service.imageUrls && service.imageUrls.length > 0 ? (
                    <img src={service.imageUrls[0]} alt={service.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      No Image
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-slate-900 dark:text-white line-clamp-1">{service.title}</h3>
                  <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{service.averageRating || 'New'}</span>
                  </div>
                </div>
                <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-1">{service.description}</p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-1 text-sm text-slate-500">
                    <MapPin className="w-4 h-4 text-primary-500" />
                    <span className="truncate max-w-[120px]">{service.city || 'Local'}</span>
                  </div>
                  <div className="font-bold text-primary-600 dark:text-primary-400">
                    ₹{service.price} <span className="text-xs font-normal text-slate-500">/{service.priceUnit === 'per_hour' ? 'hr' : 'visit'}</span>
                  </div>
                </div>
              </GlassCard>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
