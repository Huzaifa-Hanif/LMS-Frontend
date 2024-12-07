# LMS Platform: Next.js 15,  React, Stripe, Mux, Prisma, Tailwind, MySQL, MONGODB, TypeScript


Key Features:

- Browse & Filter Courses
- Purchase Courses using Stripe
- Mark Chapters as Completed or Uncompleted
- Progress Calculation of each Course
- Student Dashboard
- Teacher mode
- Create new Courses
- Create new Chapters
- Easily reorder chapter position with drag n’ drop
- Upload thumbnails, attachments and videos using UploadThing
- Video processing using Mux
- HLS Video player using Mux
- Rich text editor for chapter description
- Authentication using Clerk
- ORM using Prisma
- MySQL database
- Mongodb database
- Prisma

### Prerequisites

**Node version 22.x.x**

### Cloning the repository

```shell
git clone https://github.com/SyedAbdulRehman1/lms-chatbot.git
```

### Install packages

```shell
npm i
```

### Setup .env file


### Setup Prisma

Add MySQL Database (I used PlanetScale)

```shell
npx prisma generate
npx prisma db push

```

### Start the app

```shell
npm run dev
```

## Available commands

Running commands with npm `npm run [command]`

| command         | description                              |
| :-------------- | :--------------------------------------- |
| `dev`           | Starts a development instance of the app |
