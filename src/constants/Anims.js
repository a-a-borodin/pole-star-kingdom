const Anims = {
    PopUpTalkDialog: {
        key: "popUpTalkDialog",
        frames: [0, 1, 2],
        frameRate: 4,
        repeat: -1,
    },

    Shop: {
        Working: {
            key: "shopWorking",
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 6,
            repeat: -1,
        },
    },

    Portal: {
        Working: {
            key: "portalWorking",
            frames: [0, 1, 2, 3, 4, 5, 6, 7],
            frameRate: 7,
            repeat: -1,
        },
        Opens: {
            key: "portalOpens",
            frames: [8, 9, 10, 11, 12, 13, 14, 15],
            frameRate: 7,
            repeat: 0,
        },
        Closes: {
            key: "portalCloses",
            frames: [16, 17, 18, 19, 20, 21],
            frameRate: 5,
            repeat: 0,
        }
    },

    Chest: {
        Opens: {
            key: "chestOpens",
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 5,
            repeat: 0,
        },
    },

    Coin: {
        Rotating: {
            key: "coinRotating",
            frames: [0, 1, 2, 3, 4, 5, 6],
            frameRate: 7,
            repeat: -1,
        },
    },

    Player: {
        Idle: {
            key: "playerIdle",
            frames: [0, 1],
            frameRate: 2,
            repeat: -1,
        },
        Walk: {
            key: "playerWalk",
            frames: [16, 17, 18, 19],
            frameRate: 7,
            repeat: -1,
        },
        Attack: {
            key: "attack",
            frames: [66, 67, 68, 69, 70, 71],
            frameRate: 14,
            repeat: 0,
        },
        Dead: {
            key: "dead",
            frames: [56, 57, 58, 59, 60, 61, 62, 63],
            frameRate: 6,
            repeat: 0,
        },
    },

    Wizzard: {
        Idle: {
            key: "wizzardIdle",
            frames: [0, 1, 2, 3, 4, 5],
            frameRate: 7,
            repeat: -1,
        },
    },

    WolfBlack: {
        Run: {
            key: "wolfBlackRun",
            frames: [17, 16, 15, 14, 13, 12],
            frameRate: 10,
            repeat: -1,
        },
        Attack: {
            key: "wolfBlackAttack",
            frames: [11, 10, 9, 8, 7, 6],
            frameRate: 16,
            repeat: 0,
        },
        Dead: {
            key: "wolfBlackDead",
            frames: [28, 27, 26, 25, 24],
            frameRate: 3,
            repeat: 0,
        },
    },

    WolfWhite: {
        Run: {
            key: "wolfWhiteRun",
            frames: [17, 16, 15, 14, 13, 12],
            frameRate: 10,
            repeat: -1,
        },
        Attack: {
            key: "wolfWhiteAttack",
            frames: [11, 10, 9, 8, 7, 6],
            frameRate: 16,
            repeat: 0,
        },
        Dead: {
            key: "wolfWhiteDead",
            frames: [29, 28, 27, 26, 25],
            frameRate: 3,
            repeat: 0,
        },
    },

    SlimeGreen: {
        Run: {
            key: "slimeGreenRun",
            frames: [27, 28, 29, 30, 31],
            frameRate: 10,
            repeat: -1,
        },
        Attack: {
            key: "slimeGreenAttack",
            frames: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            frameRate: 24,
            repeat: 0,
        },
        Dead: {
            key: "slimeGreenDead",
            frames: [9, 10, 11, 12, 13, 14, 15, 16],
            frameRate: 8,
            repeat: 0,
        },
    },

    AlienBlue: {
        Run: {
            key: "alienBlueRun",
            frames: [8, 9, 10, 11, 12],
            frameRate: 11,
            repeat: -1,
        },
        Attack: {
            key: "alienBlueAttack",
            frames: [16, 17, 18, 19, 20],
            frameRate: 16,
            repeat: 0,
        },
        Dead: {
            key: "alienBlueDead",
            frames: [32, 33, 34, 35, 36, 37],
            frameRate: 5,
            repeat: 0,
        },
    }
};

export default Anims;