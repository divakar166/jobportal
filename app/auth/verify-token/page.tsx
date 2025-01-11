"use client"

import { verifyToken } from '@/actions/verification'
import { CardWrapper } from '@/components/auth/card-wrapper'
import { FormError } from '@/components/form-error'
import { FormSuccess } from '@/components/form-success'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useCallback, useEffect, useState } from 'react'
import { BarLoader, BeatLoader } from 'react-spinners'

const VerifyToken = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const type = searchParams.get('type');

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token || !type) {
      setError("Missing token!");
      return;
    }
    verifyToken(token, type)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, type, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <Suspense fallback={<div><BarLoader color='#fff' /></div>}>
      <CardWrapper
        headerLabel="Confirming your verification"
        backButtonLabel="Back to login"
        backButtonHref="/auth/developer/login"
      >
        <div className="flex items-center w-full justify-center">
          {!success && !error && (
            <BeatLoader />
          )}
          {success && (
            <FormSuccess message={success} />
          )}
          {error && (
            <FormError message={error} />
          )}
        </div>
      </CardWrapper>
    </Suspense>
  )
}

export default VerifyToken