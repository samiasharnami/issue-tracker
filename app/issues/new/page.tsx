'use client'

import { Button, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from 'react'

const NewIssuesPage = () => {
  return (
    <div className='max-w-xl space-y-4'>
        <TextField.Root placeholder='Title'/>
        <SimpleMDE placeholder="Description" />
        <Button>Submit New Issue</Button>
    </div>
  )
}

export default NewIssuesPage