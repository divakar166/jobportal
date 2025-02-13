"use client";

import { CardWrapper } from './card-wrapper';
import { BeatLoader } from 'react-spinners';
import { FormSuccess } from '../form-success';
import { FormError } from '../form-error';
import { useEffect, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyToken } from '@/actions/verification';

const VerifyToken = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const hasSubmitted = useRef(false);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const type = searchParams.get('type');
  const router = useRouter();

  useEffect(() => {
    const submitToken = async () => {
      if (hasSubmitted.current) return;
      hasSubmitted.current = true;

      if (!token || !type) {
        setError("Missing token!");
        return;
      }

      try {
        const data = await verifyToken(token, type);
        if (data.error) {
          setError(data.error);
        } else {
          setSuccess(data.success);
          setInterval(() => {
            router.push('auth/developer/login')
          }, 3000)
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError("Something went wrong!");
      }
    };

    submitToken();
  }, [token, type]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <BeatLoader color={'white'} />}
        {success && <FormSuccess message={success} />}
        {error && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default VerifyToken;
