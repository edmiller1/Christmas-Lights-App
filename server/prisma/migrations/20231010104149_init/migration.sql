-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "premium" BOOLEAN NOT NULL,
    "provider" TEXT NOT NULL,
    "notifications_on_app_verification" BOOLEAN NOT NULL,
    "notifications_on_app_rating" BOOLEAN NOT NULL,
    "notifications_by_email_verification" BOOLEAN NOT NULL,
    "notifications_by_email_rating" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Decoration" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL,
    "verification_submitted" BOOLEAN NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "num_ratings" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "country" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "num_views" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "creator_id" TEXT NOT NULL,
    "favourited_by_id" TEXT NOT NULL,
    "added_to_history_by_id" TEXT NOT NULL,

    CONSTRAINT "Decoration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DecorationImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "decoration_id" TEXT NOT NULL,

    CONSTRAINT "DecorationImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "decoration_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "View" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "decoration_id" TEXT NOT NULL,

    CONSTRAINT "View_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "unread" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Decoration" ADD CONSTRAINT "Decoration_creator_id_fkey" FOREIGN KEY ("creator_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Decoration" ADD CONSTRAINT "Decoration_favourited_by_id_fkey" FOREIGN KEY ("favourited_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Decoration" ADD CONSTRAINT "Decoration_added_to_history_by_id_fkey" FOREIGN KEY ("added_to_history_by_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DecorationImage" ADD CONSTRAINT "DecorationImage_decoration_id_fkey" FOREIGN KEY ("decoration_id") REFERENCES "Decoration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_decoration_id_fkey" FOREIGN KEY ("decoration_id") REFERENCES "Decoration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "View" ADD CONSTRAINT "View_decoration_id_fkey" FOREIGN KEY ("decoration_id") REFERENCES "Decoration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
