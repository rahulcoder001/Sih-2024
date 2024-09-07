"use client"
import React, { useRef, useState } from 'react';

const Page = () => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const [type , setType] = useState('');

  const handleProfileChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
        setFile(file);  
    }
};

async function handlesubmit() {
  
  
  const formData = new FormData();
  //@ts-ignore
  formData.append('uploadfile', file);
  formData.append('Documenttype', type);
  formData.append('password', password);
  if (profile) {
      formData.append('avatar', profile);
  }

  try {
      const response = await axios.post("/api/adduser", formData, {
          headers: {
              'Content-Type': 'multipart/form-data',
          },
      });

      if (response.data.ok) {
          toast.success(response.data.message);
          const res = await signIn("credentials", {
              redirect: false,
              email: email,
              password: password,
          });

          if (res?.ok) {
              setLoading(false);
              router.push('/');
              toast.success("Autenticated sucssefully")
          } else {
              setLoading(false);
              toast.error("authentication failed");
          }
          
      } else {
          setLoading(false);
          toast.error(response.data.message);
      }
  } catch (error) {
      setLoading(false);
      toast.error("Error signing up");
  }
  setLoading(false);
}

  return (
    <section>
      <div>
        <h1 className="text-center text-4xl text-white mb-4">Document Upload</h1>
        <form className='flex flex-col gap-5'>
          <select 
            id="cars" 
            name="cars" 
            className="w-3/12 px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="volvo">Document Type</option>
            <option value="saab">Birth Certificate</option>
            <option value="fiat">Mark Sheet Class 10th</option>
            <option value="audi">Mark Sheet Class 12th</option>
            <option value="audi">PAN Card</option>
          </select>
          <input 
            type="text" 
            placeholder='Recipient name' 
            className='w-3/12 px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500'
          />
          <div className='flex gap-10 mr-7'>
            <div className='flex flex-col gap-1'>
              <label htmlFor="date">Issuing Date</label>
              <input 
                type="date"  
                name="issuingDate"  
                className="px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                style={{ width: '24vw' }}
              />
            </div>

            <div className='flex flex-col gap-1'>
              <label htmlFor="date">Expiring Date (Optional)</label>
              <input 
                type="date"  
                name="expiringDate"  
                className="px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                style={{ width: '24vw' }}
              />
            </div>
          </div>
          <button 
            type="button" 
            className='w-3/12 px-4 py-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:border-blue-500'
            onClick={() => fileInputRef.current.click()}
          >
            Upload File
          </button>
          <input 
            type="file" 
            ref={fileInputRef}
            accept=".csv, .pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          {fileName && (
            <p className='text-white mt-2'>Selected file: {fileName}</p>
          )}
          <div className='w-full flex justify-center'>
          <button className='ml-20   border-2 border-white p-3 font-bold rounded-lg text-sm hover:bg-slate-600'>Submit</button>
          <button className='ml-2  border-2 border-white p-3 font-bold rounded-lg text-sm hover:bg-slate-600'>Cancel</button>
          </div>

          
        </form>
      </div>
    </section>
  );
};

export default Page;
