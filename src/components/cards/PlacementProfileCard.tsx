import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Mail, Phone, Briefcase, MapPin, Award, Users, TrendingUp, Edit, Trash2, ExternalLink } from 'lucide-react';

interface PlacementProfileData {
  id: number;
  first_name: string;
  last_name: string;
  designation: string;
  department?: string;
  bio?: string;
  profile_photo?: string;
  contact_email: string;
  contact_phone: string;
  office_phone?: string;
  office_extension?: string;
  office_address?: string;
  linkedin_url?: string;
  twitter_url?: string;
  facebook_url?: string;
  website_url?: string;
  experience_years?: number;
  specialization?: string;
  students_placed?: number;
  average_placement_package?: number;
  highest_package?: number;
  companies_collaborated?: number;
  achievements?: string;
}

interface ProfileCardProps {
  profile: PlacementProfileData;
  onEdit?: (profile: PlacementProfileData) => void;
  onDelete?: (id: number) => void;
}

export default function PlacementProfileCard({ profile, onEdit, onDelete }: ProfileCardProps) {
  const fullName = `${profile.first_name} ${profile.last_name}`;

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-4">
        <div className="flex gap-4">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            {profile.profile_photo ? (
              <img 
                src={profile.profile_photo} 
                alt={fullName}
                className="w-24 h-24 rounded-lg object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-orange-200 to-red-200 flex items-center justify-center border-2 border-gray-200">
                <span className="text-2xl font-bold text-gray-400">
                  {profile.first_name[0]}{profile.last_name[0]}
                </span>
              </div>
            )}
          </div>

          {/* Header Info */}
          <div className="flex-1">
            <CardTitle className="text-xl text-gray-800">{fullName}</CardTitle>
            <p className="text-sm font-semibold text-orange-600">{profile.designation}</p>
            {profile.department && (
              <p className="text-xs text-gray-500">{profile.department}</p>
            )}
            
            {/* Quick Stats */}
            {(profile.students_placed || profile.average_placement_package) && (
              <div className="flex gap-4 mt-2 text-xs">
                {profile.students_placed && (
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-blue-500" />
                    <span>{profile.students_placed} placed</span>
                  </div>
                )}
                {profile.average_placement_package && (
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span>₹{profile.average_placement_package} avg</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Actions */}
          {(onEdit || onDelete) && (
            <div className="flex gap-2">
              {onEdit && (
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onEdit(profile)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
              )}
              {onDelete && (
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => onDelete(profile.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Bio */}
        {profile.bio && (
          <p className="text-sm text-gray-600 leading-relaxed">{profile.bio}</p>
        )}

        {/* Contact Information */}
        <div className="space-y-2 pt-2 border-t">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-gray-400" />
            <a href={`mailto:${profile.contact_email}`} className="text-orange-600 hover:underline">
              {profile.contact_email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-gray-400" />
            <span className="text-gray-700">Mobile: {profile.contact_phone}</span>
          </div>
          {profile.office_phone && (
            <div className="flex items-center gap-2 text-sm">
              <Briefcase className="w-4 h-4 text-gray-400" />
              <span className="text-gray-700">
                Office: {profile.office_phone}
                {profile.office_extension && ` (Ext: ${profile.office_extension})`}
              </span>
            </div>
          )}
          {profile.office_address && (
            <div className="flex gap-2 text-sm">
              <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
              <span className="text-gray-700">{profile.office_address}</span>
            </div>
          )}
        </div>

        {/* Professional Info */}
        {(profile.experience_years || profile.specialization) && (
          <div className="space-y-2 pt-2 border-t">
            {profile.experience_years && (
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Experience:</span> {profile.experience_years} years
              </p>
            )}
            {profile.specialization && (
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Specialization:</span> {profile.specialization}
              </p>
            )}
          </div>
        )}

        {/* Achievements */}
        {(profile.students_placed || profile.highest_package || profile.companies_collaborated) && (
          <div className="grid grid-cols-3 gap-3 pt-2 border-t bg-gray-50 -mx-4 -mb-4 p-4 rounded-b-lg">
            {profile.students_placed && (
              <div className="text-center">
                <p className="text-lg font-bold text-orange-600">{profile.students_placed}</p>
                <p className="text-xs text-gray-600">Students Placed</p>
              </div>
            )}
            {profile.highest_package && (
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">₹{profile.highest_package}</p>
                <p className="text-xs text-gray-600">Highest Package</p>
              </div>
            )}
            {profile.companies_collaborated && (
              <div className="text-center">
                <p className="text-lg font-bold text-blue-600">{profile.companies_collaborated}</p>
                <p className="text-xs text-gray-600">Companies</p>
              </div>
            )}
          </div>
        )}

        {/* Social Links */}
        {(profile.linkedin_url || profile.twitter_url || profile.facebook_url || profile.website_url) && (
          <div className="flex gap-2 pt-2 border-t">
            {profile.linkedin_url && (
              <a href={profile.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {profile.twitter_url && (
              <a href={profile.twitter_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-500">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {profile.facebook_url && (
              <a href={profile.facebook_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {profile.website_url && (
              <a href={profile.website_url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-700">
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
