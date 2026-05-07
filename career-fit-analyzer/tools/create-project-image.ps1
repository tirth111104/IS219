Add-Type -AssemblyName System.Drawing

$width = 1400
$height = 920
$bitmap = New-Object System.Drawing.Bitmap $width, $height
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.Clear([System.Drawing.Color]::FromArgb(244, 241, 234))

$fontTitle = New-Object System.Drawing.Font "Segoe UI", 58, ([System.Drawing.FontStyle]::Bold)
$fontHeading = New-Object System.Drawing.Font "Segoe UI", 26, ([System.Drawing.FontStyle]::Bold)
$fontBody = New-Object System.Drawing.Font "Segoe UI", 20
$fontSmall = New-Object System.Drawing.Font "Segoe UI", 16
$brushInk = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(23, 27, 32))
$brushMuted = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(90, 98, 109))
$brushAccent = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(14, 107, 93))
$brushPanel = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 255, 255))
$penLine = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(216, 221, 216)), 2

function Fill-RoundRect($x, $y, $w, $h, $r, $brush) {
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddArc($x, $y, $r, $r, 180, 90)
  $path.AddArc($x + $w - $r, $y, $r, $r, 270, 90)
  $path.AddArc($x + $w - $r, $y + $h - $r, $r, $r, 0, 90)
  $path.AddArc($x, $y + $h - $r, $r, $r, 90, 90)
  $path.CloseFigure()
  $graphics.FillPath($brush, $path)
  $graphics.DrawPath($penLine, $path)
}

$graphics.DrawString("CAREER FIT ANALYZER", $fontSmall, $brushAccent, 70, 58)
$graphics.DrawString("Resume gaps into a learning plan", $fontTitle, $brushInk, 70, 88)
$graphics.DrawString("Applied AI Product Engineer", $fontHeading, $brushMuted, 74, 178)

Fill-RoundRect 70 260 590 500 18 $brushPanel
$graphics.DrawString("Resume Signals", $fontHeading, $brushInk, 105, 300)
$resume = "React + TypeScript`nNode.js APIs`nOpenAI API coursework`nD3 data storytelling`nPortfolio case studies"
$graphics.DrawString($resume, $fontBody, $brushMuted, 110, 360)

Fill-RoundRect 710 260 620 230 18 $brushPanel
$graphics.DrawString("Repeated job demand", $fontHeading, $brushInk, 745, 300)
$graphics.DrawString("RAG / vector search     75%`nLLM integration           75%`nEvaluation + testing     100%", $fontBody, $brushMuted, 750, 360)

Fill-RoundRect 710 530 620 230 18 $brushPanel
$graphics.DrawString("Best next project focus", $fontHeading, $brushInk, 745, 570)
$graphics.DrawString("1. Build retrieval workflow proof`n2. Add automated evaluation cases", $fontBody, $brushMuted, 750, 630)

$graphics.FillRectangle($brushAccent, 70, 820, 1260, 12)
$graphics.DrawString("Working browser demo + tested analyzer logic + real 2026 job descriptions", $fontSmall, $brushInk, 70, 850)

$output = Join-Path $PSScriptRoot "..\assets\career-fit-analyzer.png"
New-Item -ItemType Directory -Force -Path (Split-Path $output) | Out-Null
$bitmap.Save($output, [System.Drawing.Imaging.ImageFormat]::Png)

$graphics.Dispose()
$bitmap.Dispose()
