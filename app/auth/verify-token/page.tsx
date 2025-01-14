"use client"

import VerifyToken from '@/components/auth/verity-token'
import React, { Suspense } from 'react'
import { BarLoader } from 'react-spinners'

const VerifyTokenPage = () => {

  return (
    <Suspense fallback={<div><BarLoader color='#fff' /></div>}>
      <VerifyToken />
    </Suspense>
  )
}

export default VerifyTokenPage