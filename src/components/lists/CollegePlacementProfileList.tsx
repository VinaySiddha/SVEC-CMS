import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

export default function CollegePlacementProfileList() {
  const [profiles, setProfiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/college-placement-profile')
      .then(res => res.json())
      .then(data => {
        setProfiles(data.data || []);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {profiles.map(profile => (
        <Card key={profile.id}>
          <CardHeader>
            <CardTitle>{profile.placement_officer}</CardTitle>
          </CardHeader>
          <CardContent>
            <div>Email: {profile.contact_email}</div>
            <div>Phone: {profile.contact_phone}</div>
            <div>Achievements: {profile.achievements}</div>
            {profile.profile_photo && <img src={profile.profile_photo} alt="Profile" className="w-24 h-24 rounded-full mt-2" />}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
