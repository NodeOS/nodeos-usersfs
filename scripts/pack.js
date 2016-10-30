#!/usr/bin/env node

const pack = require('tar-fs').pack


const argv = process.argv.slice(2)

const root = argv[0]
const dir  = argv[1]
const uid  = argv[2]
const gid  = argv[3]


pack(root,
{
  map: function(header)
  {
    if(header.name.split('/')[0] === dir)
    {
      header.uid = uid
      header.gid = gid
    }

    return header
  },
  umask: 0x077
})
.pipe(process.stdout)
