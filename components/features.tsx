'use client';

import { useState } from 'react';
import { WindowTintingBookingStepper } from "acme-booking-stepper-full-ui";

export default function Features() {
  const [tab, setTab] = useState<number>(1);

  return (
    <section className='py-6 md:py-8'>
      <div className="max-w-7xl mx-auto">
        <WindowTintingBookingStepper
          onConfirm={(payload: any, data: any) => {
            // handle submit
            console.log(payload, data);
          }}
        />
      </div>
    </section>
  );
}
