// api.js (fichier de définition des routes)
const express = require('express');

const router = express.Router();

// Route GET pour obtenir tous les utilisateurs
router.get('/users', (req, res) => {
  // Logique pour récupérer les utilisateurs
  const users = [
    {
        id: "1",
        name: "user1"
    },
    {
        id: "1",
        name: "user1"
    }
  ]
  // Envoie les utilisateurs en réponse
  res.json(users);
});

// Route GET pour obtenir tous les utilisateurs
router.get('/rooms', (req, res) => {
  // Logique pour récupérer les utilisateurs
  const data = [
    {
      salle: 'amphi',
      ip: '192.168.10.2',
      src: ['192.168.10.2:3000', '192.168.10.2:3001', '192.168.10.2:3002', '192.168.10.2:3003'],
      type: "video/mp4"
    },
    {
      salle: 'salle 16',
      ip: '192.168.10.3',
      src: ['192.168.10.3:3000', '192.168.10.3:3001', '192.168.10.3:3002', '192.168.10.3:3003'],
      type: "video/mp4"
    },
    {
      salle: 'salle 26',
      ip: '192.168.10.4',
      src: ['192.168.10.4:3000', '192.168.10.4:3001', '192.168.10.4:3002', '192.168.10.4:3003'],
      type: "video/mp4"
    },
    {
      salle: 'salle 12',
      ip: '192.168.10.5',
      src: ['192.168.10.5:3000', '192.168.10.5:3001', '192.168.10.5:3002', '192.168.10.5:3003'],
      type: "video/mp4"
    },
    {
      salle: 'salle 13',
      ip: '192.168.10.6',
      src: ['192.168.10.6:3000', '192.168.10.6:3001', '192.168.10.6:3002', '192.168.10.6:3003'],
      type: "video/mp4"
    },
    {
      salle: 'salle 14',
      ip: '192.168.10.7',
      src: ['192.168.10.7:3000', '192.168.10.7:3001', '192.168.10.7:3002', '192.168.10.7:3003'],
      type: "video/mp4"
    },
    {
      salle: 'salle 11A',
      ip: '192.168.10.8',
      src: ['192.168.10.8:3000', '192.168.10.8:3001', '192.168.10.8:3002', '192.168.10.8:3003'],
      type: "video/mp4"
    },
    {
      salle: 'salle 11B',
      ip: '192.168.10.9',
      src: ['192.168.10.9:3000', '192.168.10.9:3001', '192.168.10.9:3002', '192.168.10.9:3003'],
      type: "video/mp4"
    },
  ];
  // Envoie les utilisateurs en réponse
  res.json(data);
});

// Route GET pour obtenir tous les metadata logs
router.get('/logs/metadata/video', (req, res) => {
  // Logique pour récupérer les logs
  const data = [
    {
      name: "A-Cam1-100223-12:17",
      date: "10/02/2023",
      hour: "12:00 - 17h:00",
      size: "300MB",
      url: "http://192.168.10.2:6000",
      room: "amphi",
      ip: '192.168.10.2',
      shape: "1920x1080p",
      type: "video/mp4",
    },
  ];
  // Envoie les metadata video logs en réponse
  res.json(data);
});

// Route GET pour obtenir tous les treedata logs
router.get('/logs/treedata', (req, res) => {
  // Logique pour récupérer les données treedata
  const data = [
    {
      name: "Dossier de Sauvegarde",
      path: "/backup",
      type: "folder",
      children: [
        {
          name: "Janvier",
          path: "/backup/Janvier",
          type: "folder",
          children: [
            {
              name: "1",
              path: "/backup/Janvier/1",
              type: "folder",
              children: [
                {
                  name: "Video 1",
                  path: "/backup/Janvier/Video_1.mp4",
                  type: "file",
                },
                {
                  name: "Video 2",
                  path: "/backup/Janvier/Video_2.mp4",
                  type: "file",
                },
              ]
            },
            {
              name: "2",
              path: "/backup/Janvier/2",
              type: "folder",
              children: [
                {
                  name: "Video 1",
                  path: "/backup/Janvier/Video_3.mp4",
                  type: "file",
                },
                {
                  name: "Video 2",
                  path: "/backup/Janvier/Video_4.mp4",
                  type: "file",
                },
              ]
            }
          ],
        },
        {
          name: "Fevrier",
          path: "/backup/Fevrier",
          type: "folder",
          children: [
            {
              name: "Video 3",
              path: "/backup/Fevrier/Video_3.mp4",
              type: "file",
            },
          ],
        },
        {
          name: "Mars",
          path: "/backup/Mars",
          type: "folder",
          children: [
            {
              name: "Video 1",
              path: "/backup/Mars/Video_1.mp4",
              type: "file",
            },
            {
              name: "Video 2",
              path: "/backup/Mars/Video_2.mp4",
              type: "file",
            },
          ]
        },
        {
          name: "Avril",
          path: "/backup/Avril",
          type: "folder",
          children: [
            {
              name: "Video 1",
              path: "/backup/Avril/Video_1.mp4",
              type: "file",
            },
            {
              name: "Video 2",
              path: "/backup/Avril/Video_2.mp4",
              type: "file",
            },
          ]
        },
        {
          name: "Mai",
          path: "/backup/Mai",
          type: "folder",
          children: [
            {
              name: "Video 1",
              path: "/backup/Mai/Video_1.mp4",
              type: "file",
            },
            {
              name: "Video 2",
              path: "/backup/Mai/Video_2.mp4",
              type: "file",
            },
          ]
        },
        {
          name: "Juin",
          path: "/backup/Juin",
          type: "folder",
          children: [
            {
              name: "Video 1",
              path: "/backup/Juin/Video_1.mp4",
              type: "file",
            },
            {
              name: "Video 2",
              path: "/backup/Juin/Video_2.mp4",
              type: "file",
            },
          ]
        },
        {
          name: "Juillet",
          path: "/backup/Juillet",
          type: "folder",
          children: [
            {
              name: "Video 1",
              path: "/backup/Juillet/Video_1.mp4",
              type: "file",
            },
            {
              name: "Video 2",
              path: "/backup/Juillet/Video_2.mp4",
              type: "file",
            },
          ]
        },
        {
          name: "Aout",
          path: "/backup/Aout",
          type: "folder",
          children: [
            {
              name: "Video 1",
              path: "/backup/Aout/Video_1.mp4",
              type: "file",
            },
            {
              name: "Video 2",
              path: "/backup/Aout/Video_2.mp4",
              type: "file",
            },
          ]
        },
        {
          name: "Septembre",
          path: "/backup/Septembre",
          type: "folder",
          children: [
            {
              name: "Video 1",
              path: "/backup/Septembre/Video_1.mp4",
              type: "file",
            },
            {
              name: "Video 2",
              path: "/backup/Septembre/Video_2.mp4",
              type: "file",
            },
          ]
        },
        {
          name: "Octobre",
          path: "/backup/Octobre",
          type: "folder",
          children: [
            {
              name: "Video 1",
              path: "/backup/Octobre/Video_1.mp4",
              type: "file",
            },
            {
              name: "Video 2",
              path: "/backup/Octobre/Video_2.mp4",
              type: "file",
            },
          ]
        },
        {
          name: "Novembre",
          path: "/backup/Novembre",
          type: "folder",
          children: [
            {
              name: "Video 1",
              path: "/backup/Novembre/Video_1.mp4",
              type: "file",
            },
            {
              name: "Video 2",
              path: "/backup/Novembre/Video_2.mp4",
              type: "file",
            },
          ]
        },
        {
          name: "Decembre",
          path: "/backup/Decembre",
          type: "folder",
          children: [
            {
              name: "Video 1",
              path: "/backup/Decembre/Video_1.mp4",
              type: "file",
            },
            {
              name: "Video 2",
              path: "/backup/Decembre/Video_2.mp4",
              type: "file",
            },
          ]
        }
      ]
    }
  ];
  // Envoie les données treedata en réponse
  res.json(data);
});

// Exporte les routes
module.exports = router;
