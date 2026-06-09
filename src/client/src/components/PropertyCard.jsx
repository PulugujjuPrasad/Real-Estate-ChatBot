import React, { useState } from 'react';
import { Heart, MapPin, Bed, Bath, Maximize } from 'lucide-react';
import { motion } from 'framer-motion';

const PropertyCard = ({ property }) => {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden group transition-all hover:border-zinc-700"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={property.media.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isSaved ? 'bg-red-500 text-white' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Heart size={16} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex justify-between items-start gap-2">
          <h3 className="font-semibold text-zinc-100 truncate">{property.title}</h3>
          <span className="text-blue-400 font-bold text-sm">${property.price.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-1 text-zinc-500 text-xs">
          <MapPin size={12} />
          <span>{property.location}</span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-zinc-800">
          <div className="flex flex-col items-center gap-1">
            <Bed size={14} className="text-zinc-500" />
            <span className="text-xs font-medium text-zinc-300">{property.specs.bedrooms} Bed</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Bath size={14} className="text-zinc-500" />
            <span className="text-xs font-medium text-zinc-300">{property.specs.bathrooms} Bath</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Maximize size={14} className="text-zinc-500" />
            <span className="text-xs font-medium text-zinc-300">{property.specs.sizeSqft} ft²</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;
