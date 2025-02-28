import React from 'react'
import { CornerUpRight, X } from 'lucide-react'

function Reply() {
    return (
        <div className='flex p-2 flex-col gap-1'>
            <div className='flex justify-between px-2'>
                <div className='flex flex-row gap-1 items-center'>
                    <CornerUpRight className='size-4' />
                    <p className='text-white text-sm'>Reply To</p>
                </div>
                <div>
                    <X />
                </div>
            </div>

            <div className='bg-base-200 w-full rounded-xl px-3 py-2'>
                <p className='text-m text-primary'>youname</p>
                <p className='text-sm text-white truncate w-full'>message</p>
            </div>
        </div>
    )
}

export default Reply