var zelcorejs = require('..')
var chai = require('chai')
var expect = chai.expect


it('ZelNode - calculate ZelNode Public Key', function () {
  const privateKey = '5JF3aGCa6bkPvfSzqtzX7fXFjfjUG4qzp9hdtRujLRE9ZAMfhiF';
  const publicKey = zelcorejs.zelnode.getZelNodePublicKey(privateKey);
  expect(publicKey).to.equal('04f6c04f8a3569a518ec0987fc2544900e8a3f742a6e0d891a700d9a94482a0abdae64a1c106a4d4339963afd32391e0e660fabbc75c73200fc863287cfd54a7f2');
})

it('ZelNode - calculate Collateral Public Key', function () {
  const privateKey = 'L17FU2CoD4joDmEp1xMbfuD6eQ8Yr8SEC2gjbcKktLs3DS3WCCxF';
  const publicKey = zelcorejs.zelnode.getCollateralPublicKey(privateKey);
  expect(publicKey).to.equal('03c7f8f9e5368a2bee1ba3b3127b5039f84e8f1dad0e11f64e5586b76f654ee2a3');
})

it('ZelNode - create start transaction', function () {
  const collateralOutHash = '99ae0a75182e48fe82d64b5fc5b238dd79d045382ea7688d38f0b777bb2dbd44';
  const collateralOutIndex = '0'; // string
  const collateralPrivateKey = 'L17FU2CoD4joDmEp1xMbfuD6eQ8Yr8SEC2gjbcKktLs3DS3WCCxF';
  const zelnodePrivateKey = '5JF3aGCa6bkPvfSzqtzX7fXFjfjUG4qzp9hdtRujLRE9ZAMfhiF';
  const timestamp = '1584866597'; // in seconds
  const tx = zelcorejs.zelnode.startZelNode(collateralOutHash, collateralOutIndex, collateralPrivateKey, zelnodePrivateKey, timestamp);
  expect(tx).to.equal('050000000244bd2dbb77b7f0388d68a72e3845d079dd38b2c55f4bd682fe482e18750aae99000000002103c7f8f9e5368a2bee1ba3b3127b5039f84e8f1dad0e11f64e5586b76f654ee2a34104f6c04f8a3569a518ec0987fc2544900e8a3f742a6e0d891a700d9a94482a0abdae64a1c106a4d4339963afd32391e0e660fabbc75c73200fc863287cfd54a7f22525775e4120556a2ebcbdab6cc332b14996c1e0a996810a0cd6a80cd044020b04a4466dee0e67b8bc2f21fe2e1eb7d093594c2601e679750aa8a9c4eb68a21575c34e4aa082');
})

it('ZelNode - sign message', function () {
  const msg = "050000000244bd2dbb77b7f0388d68a72e3845d079dd38b2c55f4bd682fe482e18750aae99000000002103c7f8f9e5368a2bee1ba3b3127b5039f84e8f1dad0e11f64e5586b76f654ee2a34104f6c04f8a3569a518ec0987fc2544900e8a3f742a6e0d891a700d9a94482a0abdae64a1c106a4d4339963afd32391e0e660fabbc75c73200fc863287cfd54a7f22525775e4120556a2ebcbdab6cc332b14996c1e0a996810a0cd6a80cd044020b04a4466dee0e67b8bc2f21fe2e1eb7d093594c2601e679750aa8a9c4eb68a21575c34e4aa082";
  const privateKey = 'L17FU2CoD4joDmEp1xMbfuD6eQ8Yr8SEC2gjbcKktLs3DS3WCCxF';
  const signature = zelcorejs.zelnode.signMessage(msg, privateKey);
  expect(signature).to.equal('Hwwod9fKqEGZr8W5m3keUOWgDW6jhlZlr4VsNq2DvSEXHYQCBSsceJ7/uNqw7nUlBd0bi4UjFS+gmVLX9Ipe7+A=');
})

it('ZelNode - sign Start message', function () {
  const msg = "050000000244bd2dbb77b7f0388d68a72e3845d079dd38b2c55f4bd682fe482e18750aae99000000002103c7f8f9e5368a2bee1ba3b3127b5039f84e8f1dad0e11f64e5586b76f654ee2a34104f6c04f8a3569a518ec0987fc2544900e8a3f742a6e0d891a700d9a94482a0abdae64a1c106a4d4339963afd32391e0e660fabbc75c73200fc863287cfd54a7f22525775e";
  const privateKey = 'L17FU2CoD4joDmEp1xMbfuD6eQ8Yr8SEC2gjbcKktLs3DS3WCCxF';
  const signature = zelcorejs.zelnode.signStartMessage(msg, privateKey);
  expect(signature).to.equal('20556a2ebcbdab6cc332b14996c1e0a996810a0cd6a80cd044020b04a4466dee0e67b8bc2f21fe2e1eb7d093594c2601e679750aa8a9c4eb68a21575c34e4aa082');
})

it('doubleHash', function () {
  const msg = "01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0704ffff001d014dffffffff0100f2052a01000000434104e70a02f5af48a1989bf630d92523c9d14c45c75f7d1b998e962bff6ff9995fc5bdb44f1793b37495d80324acba7c8f537caaf8432b8d47987313060cc82d8a93ac00000000";
  const hash = zelcorejs.zelnode.doubleHash(msg);
  expect(hash).to.equal('660802c98f18fd34fd16d61c63cf447568370124ac5f3be626c2e1c3c9f0052d');
})

// start tx is not having signature
it('ZelNode - Create TXID from ZelNode start tx', function () {
  const msg = "0500000002b3ae41c6046000fd129425d08fd2142fc886cf2aea8d43a6951fc770e22cf914000000002103ffbec8caa95c594c574fa486b8540551dabdfa7aa86c3261b73bc96af32ab7a741047d88ba7d428352c09b402e84344dea5afb0ae8f7602893ab74804d1f7a7fb08e61857dac35012eb3b0c4ba603b38fd9575b92a53d1410fb5bdac38687998e35c2f00735e411f0d124251bb4751f573e80a66c84040cc3a5224ca3ba88a4a238f2cad85df98e47e42fe598b5c2dc07bff6d699cd67fc869a1a8e7da6b4fadbdd7287837602b85";
  const hash = zelcorejs.zelnode.txidStart(msg);
  expect(hash).to.equal('a89fcfa77810e5b6bae6a4be065d8db9f0aa7a11bedce37b9ddf91372fe0fa4e');
})

// Confirm tx is not having both signatures
it('Create transaction ID from ZelNode confirm tx', function () {
  const msg = "0500000004b3ae41c6046000fd129425d08fd2142fc886cf2aea8d43a6951fc770e22cf9140000000092e0915e0221dc915e010b3134342e39312e39372e37411c5c7481be62ae34064e2984eb541782bdbb7c35885cf5ac9c5faeef4e73be00a0528d8faa73a246271dd6846bb7d15c719ff83b8d2321e88feb26a6562e58ed55411bd1abef6bda91d48cbbae41e0aba2f7d8cd676e7b721ed05bd5535bffc82dc93d4038807f50a0f0bffb22c6e28acf684ea5b4974f38940290037af93f76c91142";
  const hash = zelcorejs.zelnode.txidConfirm(msg);
  expect(hash).to.equal('9c4dcbd1eab60e969207c90ed0e3ad8f6f8913372b255dc967a2cdbeeccebf3e');
})