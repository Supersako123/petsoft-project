'use client';

import { useState } from 'react';
import { logOut } from "@/actions";
import { Button } from "./ui/button";

export default function SignOutButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    try {
      await logOut(); 
    } catch (error) {
      setLoading(false);
    } 
  };

  return (
    <Button 
      onClick={handleClick} 
      size={'lg'} 
      disabled={loading}
    >
      {loading ? 'Signing out...' : 'Sign out'}
    </Button>
  );
}
