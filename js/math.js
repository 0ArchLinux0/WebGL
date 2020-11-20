let matrix3x = [];
for (let i = 0; i < 3; i++) {
  matrix3x[i] = [];
  for (let j = 0; j < 3; j++) {
    matrix3x[i][j] = [];
    for (let z = 0; z < 3; z++) {
      matrix3x[i][j][z] = i + j + z;
    }
  }
}