## This Project referenced from 
https://www.youtube.com/watch?v=lEflo_sc82g 

## Details needed from appwrite and to be updated under env variables
PROJECT_ID
project id you will find at the top left corner of appwrite

API_KEY
- Go to **Integrate with your server** under appwrite
- Click on api key
- provide name and next
- click select all (it gives full scope) and next
- copy the api key secrete

DATABASE_ID
- Go to Databases
- Click on Create Database
- Give database a name leave Entry Id empty and click Create
- It will create a database ID, copy it

PATIENT_COLLECTION_ID, DOCTOR_COLLECTION_ID, APPOINTMENT_COLLECTION_ID
- Once Database created above click on create collection
- Give some name like patient, doctor, appointment and create
- copy collection id

## We also need storage to upload documents of people
NEXT_PUBLIC_BUCKET_ID
- In appwrite, go to Storage
- Click on Create Bucket
- Give name like carepulse_storage and copy its ID

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
