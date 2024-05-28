const dungeon = [
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0],        // 1, 5 Spiders
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 0, 0, 1, 0],        // 2, 10 Skeletons
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 1],
        [0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0],        // 3, 9 Ogre and Giant Mantis
        [0, 0, 0, 1, 0],
        [1, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 1],        // 4, 8 Baby Dragons
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],        // 6 Skeleton King
        [0, 0, 1, 1, 0],
        [1, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],        // 7, 11 Orcs
        [0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 0, 0, 0, 1],
        [0, 1, 1, 0, 0],
        [0, 0, 0, 0, 0],        // 12 Final Boss
        [0, 0, 1, 0, 0],
        [1, 0, 0, 0, 0]
    ]
]

module.exports = {dungeon}