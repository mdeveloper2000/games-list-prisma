-- CreateTable
CREATE TABLE `games` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(50) NOT NULL,
    `year` INTEGER NOT NULL,
    `multiplayer` ENUM('YES', 'NO') NOT NULL DEFAULT 'NO',
    `platinum` ENUM('YES', 'NO') NOT NULL DEFAULT 'YES',
    `details` VARCHAR(255) NULL,

    UNIQUE INDEX `games_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
