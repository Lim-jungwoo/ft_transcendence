-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "avatar" TEXT,
    "tfa" BOOLEAN NOT NULL DEFAULT false,
    "tfacode" TEXT,
    "tfatime" TIMESTAMP(3),
    "rtoken" TEXT,
    "status" TEXT NOT NULL DEFAULT 'offline',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "History" (
    "myid" INTEGER NOT NULL,
    "yourid" INTEGER NOT NULL,
    "result" TEXT NOT NULL,
    "score" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "historypk" SERIAL NOT NULL,

    CONSTRAINT "History_pkey" PRIMARY KEY ("historypk")
);

-- CreateTable
CREATE TABLE "FriendRequest" (
    "requestpk" SERIAL NOT NULL,
    "myid" INTEGER NOT NULL,
    "friendname" TEXT NOT NULL,
    "response" TEXT NOT NULL DEFAULT 'accept or decline',

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("requestpk")
);

-- CreateTable
CREATE TABLE "_friends" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "_friends_AB_unique" ON "_friends"("A", "B");

-- CreateIndex
CREATE INDEX "_friends_B_index" ON "_friends"("B");

-- AddForeignKey
ALTER TABLE "History" ADD CONSTRAINT "History_myid_fkey" FOREIGN KEY ("myid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_myid_fkey" FOREIGN KEY ("myid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_friends" ADD CONSTRAINT "_friends_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_friends" ADD CONSTRAINT "_friends_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
