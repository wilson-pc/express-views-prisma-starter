-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sid" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_sid_key" ON "Session"("sid");

-- RedefineIndex
DROP INDEX "User.password_unique";
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- RedefineIndex
DROP INDEX "User.email_unique";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
