node --experimental-sea-config native/sea-config.json
cp $(command -v node) native/script
codesign --remove-signature native/script
sudo npx postject native/script NODE_SEA_BLOB native/sea-prep.blob \
    --sentinel-fuse NODE_SEA_FUSE_fce680ab2cc467b6e072b8b5df1996b2 \
    --macho-segment-name NODE_SEA