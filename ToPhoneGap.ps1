
param( 
    	[string] $Authtoken,		
		[string] $AppId
     )

if ([string]::IsNullOrEmpty($Authtoken))
{
	$Authtoken = "e14yHg8uqTerTWZUc5pc";
}

if ([string]::IsNullOrEmpty($AppId))
{
	$AppId = "516949";
}

Write-Output $Authtoken;
Write-Output $AppId;

try
{
	$loc = Get-Location;
	$location = $loc.ToString();

	$sevenZip = "$location\7z.exe";
	$allArgs = @('a', 'scrumlog.app.zip', 'css', 'img', 'js', 'lib', 'templates', '../config.xml', 'index.*')

	Write-Output "Zipping...";
	& $sevenZip $allArgs;

}
catch
{
	Write-Output "Something went wrong";
	Write-Output $Error;
}
