import { useTypedSelector } from '@/hooks/user/reduxHooks';
import React from 'react';
import defa from '@/assets/defaultUser.png';

function ProfileImage() {
  const user = useTypedSelector((store) => store.app.user);
  return (
    <img src={user?.photo?.secure_url || defa} width={30} height={30} className="inline-flex lg:hidden" alt="profile" />
  );
}

export default ProfileImage;
