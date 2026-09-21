$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$imageRoot = Join-Path (Split-Path -Parent $PSScriptRoot) 'public/images'

# Rectangles use the source images' pixel coordinates. A solid fill removes the
# original pixels; the diagonal lines only give the masked area a visual texture.
$masks = @{
  'eci/ADMIN COOPECACCUEIL.png' = @(@(0, 0, 195, 55), @(207, 57, 1361, 355))
  'eci/donnees_agences.png' = @(@(0, 0, 195, 55), @(223, 130, 1333, 590))
  ("eci/Menu trouv{0}s.png" -f [char]0xE9) = @(@(24, 340, 1118, 533))
  'eci/Menus admin coopec.png' = @(@(0, 0, 254, 55))
  'eci/Menus.png' = @(@(0, 0, 198, 55))
  'eci/Modal motif.png' = @(@(227, 0, 654, 165), @(0, 285, 215, 591), @(750, 285, 811, 591))
  'eci/tableau dormant.png' = @(@(15, 221, 1108, 552))
  'Gel/Connexion.png' = @(@(0, 31, 650, 72))
  'Gel/Accueil-Uploader.png' = @(@(600, 0, 1155, 65))
  ("Gel/Cr{0}dits.png" -f [char]0xE9) = @(@(293, 282, 1330, 373), @(600, 0, 1155, 63))
  'Gel/Historique des gels.png' = @(@(282, 216, 1236, 636), @(600, 0, 1155, 45))
  'Gel/Simulation.png' = @(@(293, 267, 1311, 334), @(600, 0, 1155, 63))
  'Gel/Suivi.png' = @(@(272, 183, 1283, 506), @(600, 0, 1155, 48))
  ("Gel/Surveillance D{0}gel.png" -f [char]0xE9) = @(@(600, 0, 1155, 52))
  ("Gel/V{0}rifications.png" -f [char]0xE9) = @(@(600, 0, 1155, 52))
  'credits-radies/credits radies.png' = @(@(0, 0, 2029, 1395))
  'garage-revelation/accueil-dashboard.png' = @(@(0, 60, 245, 125), @(260, 130, 1901, 375), @(260, 831, 1300, 894))
  'garage-revelation/Clients.png' = @(@(0, 55, 250, 125), @(285, 676, 1870, 865))
  'garage-revelation/factures.png' = @(@(0, 55, 250, 125), @(275, 524, 1875, 843))
  'garage-revelation/details-factures.png' = @(@(0, 55, 238, 127), @(924, 90, 1220, 188), @(548, 283, 1320, 914), @(265, 527, 532, 843), @(1331, 527, 1864, 843))
  'casse-revelation/dashboard.png' = @(@(0, 72, 295, 154), @(313, 161, 1896, 456))
  'casse-revelation/voitures.png' = @(@(0, 72, 290, 153), @(332, 757, 1844, 807))
  'casse-revelation/Carosseries.png' = @(@(0, 72, 299, 153), @(341, 658, 1852, 832))
  'casse-revelation/ventes.png' = @(@(0, 72, 289, 153))
}

foreach ($entry in $masks.GetEnumerator()) {
  $path = Join-Path $imageRoot $entry.Key
  $source = [System.Drawing.Image]::FromFile($path)
  $bitmap = New-Object System.Drawing.Bitmap($source)
  $source.Dispose()
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $background = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(223, 228, 234))
  $line = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(188, 197, 208), 2)
  try {
    $rectangles = $entry.Value
    if ($rectangles[0] -is [int]) { $rectangles = @(,$rectangles) }
    foreach ($coords in $rectangles) {
      $left, $top, $right, $bottom = $coords
      $width = [int]$right - [int]$left
      $height = [int]$bottom - [int]$top
      $graphics.FillRectangle($background, [int]$left, [int]$top, $width, $height)
      $state = $graphics.Save()
      $graphics.SetClip((New-Object System.Drawing.Rectangle([int]$left, [int]$top, $width, $height)))
      for ($x = [int]$left - $height; $x -lt [int]$right; $x += 16) {
        $graphics.DrawLine($line, $x, [int]$bottom, $x + $height, [int]$top)
      }
      $graphics.Restore($state)
    }
    $temporary = "$path.anonymized.png"
    $bitmap.Save($temporary, [System.Drawing.Imaging.ImageFormat]::Png)
  }
  finally {
    $line.Dispose()
    $background.Dispose()
    $graphics.Dispose()
    $bitmap.Dispose()
  }
  Move-Item -LiteralPath $temporary -Destination $path -Force
  Write-Output $entry.Key
}
