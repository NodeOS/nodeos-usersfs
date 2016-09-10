#!/usr/bin/env node

const fs       = require('fs-extra')
const relative = require('path').relative


const argv = process.argv

if(argv.length < 4)
{
  console.warn('Usage:', argv[1], '<dir> <uid> <gid>')
  process.exit(1)
}

const uid = argv[3]
const gid = argv[4]

fs.walk(process.argv[2]).on('data', function(item)
{
  const path  = relative(process.cwd(), item.path)
  const stats = item.stats
  const mode  = (stats.mode & fs.constants.S_IRWXU).toString(8)

  if(stats.isFile()) return console.log(path, 'f', mode, uid, gid)
  if(stats.isDirectory())   console.log(path, 'd', mode, uid, gid)
})
