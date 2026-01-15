# AIML Admin Dashboard Module Testing Script
# Tests all mapped table modules by adding and deleting dummy data

param(
    [string]$BaseUrl = "http://localhost:9002",
    [string]$Department = "aiml",
    [switch]$Verbose = $false
)

# Colors for output
$Red = [System.ConsoleColor]::Red
$Green = [System.ConsoleColor]::Green
$Yellow = [System.ConsoleColor]::Yellow
$Blue = [System.ConsoleColor]::Blue
$Cyan = [System.ConsoleColor]::Cyan

function Write-ColorOutput {
    param(
        [string]$Message,
        [System.ConsoleColor]$ForegroundColor = [System.ConsoleColor]::White
    )
    $originalColor = $Host.UI.RawUI.ForegroundColor
    $Host.UI.RawUI.ForegroundColor = $ForegroundColor
    Write-Host $Message
    $Host.UI.RawUI.ForegroundColor = $originalColor
}

# AIML Modules from dashboard configuration
$AimlModules = @(
    @{ Key = "bos-members"; Name = "BOS Members"; Table = "aiml_bos_members" },
    @{ Key = "bos-minutes"; Name = "BOS Minutes"; Table = "aiml_bos_minutes" },
    @{ Key = "department-overview"; Name = "Department Overview"; Table = "aiml_department_overview" },
    @{ Key = "extra-curricular"; Name = "Extra-Curricular"; Table = "aiml_extra_curricular" },
    @{ Key = "faculty"; Name = "Faculty"; Table = "aiml_faculty" },
    @{ Key = "faculty-achievements"; Name = "Faculty Achievements"; Table = "aiml_faculty_achievements" },
    @{ Key = "faculty-development"; Name = "Faculty Development"; Table = "aiml_faculty_development" },
    @{ Key = "hackathons"; Name = "Hackathons"; Table = "aiml_hackathons" },
    @{ Key = "hackathons-gallery"; Name = "Hackathons Gallery"; Table = "aiml_hackathons_gallery" },
    @{ Key = "handbooks"; Name = "Handbooks"; Table = "aiml_handbooks" },
    @{ Key = "mous"; Name = "MOUs"; Table = "aiml_mous" },
    @{ Key = "physical-facilities"; Name = "Physical Facilities"; Table = "aiml_physical_facilities" },
    @{ Key = "placements"; Name = "Placements"; Table = "aiml_placements" },
    @{ Key = "student-achievements"; Name = "Student Achievements"; Table = "aiml_student_achievements" },
    @{ Key = "syllabus"; Name = "Syllabus"; Table = "aiml_syllabus" },
    @{ Key = "technical-faculty"; Name = "Technical Faculty"; Table = "aiml_technical_faculty" },
    @{ Key = "workshops"; Name = "Workshops"; Table = "aiml_workshops" },
    @{ Key = "technical-association"; Name = "Technical Association"; Table = "aiml_technical_association" },
    @{ Key = "staff"; Name = "Staff"; Table = "aiml_staff" },
    @{ Key = "academic-toppers"; Name = "Academic Toppers"; Table = "aiml_academictoppers" }
)

# Dummy data templates
$DummyDataTemplates = @{
    "bos-members" = @{
        name = "Dr. Test Member"
        designation = "Professor"
        organization = "SVEC"
        position_in_job = "Chairman"
        qualification = "PhD in Computer Science"
    }
    "bos-minutes" = @{
        meeting_no = "Test Meeting #1"
        meeting_date = "2024-01-15"
        file_url = "https://example.com/test-minutes.pdf"
    }
    "department-overview" = @{
        hod_name = "Dr. Test HOD"
        hod_qualification = "PhD in AI/ML"
        hod_email = "test.hod@svec.edu.in"
        hod_image_url = "https://example.com/test-hod.jpg"
        description = "Test department overview description"
    }
    "extra-curricular" = @{
        title = "Test Extra-Curricular Activity"
        category = "Cultural"
        year = "2024-25"
        file_url = "https://example.com/test-activity.pdf"
        description = "Test activity description"
    }
    "faculty" = @{
        name = "Dr. Test Faculty"
        qualification = "PhD in Computer Science"
        designation = "Associate Professor"
        profile_url = "https://example.com/test-profile.pdf"
        faculty_type = "teaching"
    }
    "faculty-achievements" = @{
        title = "Test Faculty Achievement"
        category = "Research"
        year = "2024"
        file_url = "https://example.com/test-achievement.pdf"
        description = "Test achievement description"
    }
    "faculty-development" = @{
        title = "Test FDP Program"
        category = "Workshop"
        year = "2024"
        file_url = "https://example.com/test-fdp.pdf"
        description = "Test FDP description"
    }
    "hackathons" = @{
        title = "Test Hackathon"
        category = "Programming"
        year = "2024"
        file_url = "https://example.com/test-hackathon.pdf"
    }
    "hackathons-gallery" = @{
        title = "Test Hackathon Gallery"
        academic_year = "2024-25"
        gallery = "https://example.com/test-gallery1.jpg,https://example.com/test-gallery2.jpg"
    }
    "handbooks" = @{
        title = "Test Handbook"
        academic_year = "2024-25"
        semester = "I"
        file_url = "https://example.com/test-handbook.pdf"
    }
    "mous" = @{
        organization_name = "Test Organization"
        from_date = "2024-01-01"
        to_date = "2025-01-01"
    }
    "physical-facilities" = @{
        category = "Laboratories"
        title = "Test Lab Facility"
        description = "Test lab description"
        file_url = "https://example.com/test-facility.pdf"
    }
    "placements" = @{
        company = "Test Company"
        batch = "2024"
        status = "Placed"
        salary = "600000"
        file_url = "https://example.com/test-placement.pdf"
    }
    "student-achievements" = @{
        title = "Test Student Achievement"
        category = "Academic"
        file_url = "https://example.com/test-student-achievement.pdf"
        description = "Test student achievement description"
    }
    "syllabus" = @{
        title = "Test Syllabus"
        type = "btech"
        academic_year = "2024-25"
        file_url = "https://example.com/test-syllabus.pdf"
    }
    "technical-faculty" = @{
        name = "Test Technical Staff"
        designation = "Technical Assistant"
    }
    "workshops" = @{
        title = "Test Workshop"
        category = "Technical"
        year = "2024"
        file_url = "https://example.com/test-workshop.pdf"
    }
    "technical-association" = @{
        title = "Test Technical Association"
        category = "Professional"
        year = "2024"
        file_url = "https://example.com/test-association.pdf"
    }
    "staff" = @{
        name = "Test Staff Member"
        designation = "Lab Assistant"
    }
    "academic-toppers" = @{
        academic_year = "2024-25"
        particulars = "Test Merit Scholarship"
        students_benefited = 5
        scholarship_amount = 50000
    }
}

# Test results tracking
$TestResults = @{
    Total = 0
    Passed = 0
    Failed = 0
    Skipped = 0
    Details = @()
}

function Test-ApiEndpoint {
    param(
        [string]$Url,
        [string]$Method = "GET",
        [hashtable]$Body = $null,
        [int]$TimeoutSec = 30
    )
    
    try {
        $headers = @{
            'Content-Type' = 'application/json'
            'Accept' = 'application/json'
        }
        
        $params = @{
            Uri = $Url
            Method = $Method
            Headers = $headers
            TimeoutSec = $TimeoutSec
        }
        
        if ($Body -and ($Method -eq "POST" -or $Method -eq "PUT" -or $Method -eq "PATCH")) {
            $params.Body = $Body | ConvertTo-Json -Depth 10
        }
        
        $response = Invoke-RestMethod @params
        return @{
            Success = $true
            StatusCode = 200
            Data = $response
            Error = $null
        }
    }
    catch {
        return @{
            Success = $false
            StatusCode = $_.Exception.Response.StatusCode.value__
            Data = $null
            Error = $_.Exception.Message
        }
    }
}

function Test-AimlModule {
    param(
        [hashtable]$Module
    )
    
    $moduleTest = @{
        Module = $Module.Name
        Key = $Module.Key
        Table = $Module.Table
        Tests = @{
            Structure = @{ Status = "pending"; Message = ""; Duration = 0 }
            Create = @{ Status = "pending"; Message = ""; Duration = 0 }
            Read = @{ Status = "pending"; Message = ""; Duration = 0 }
            Delete = @{ Status = "pending"; Message = ""; Duration = 0 }
        }
        CreatedId = $null
    }
    
    Write-ColorOutput "`n🧪 Testing module: $($Module.Name) ($($Module.Key))" -ForegroundColor $Cyan
    Write-ColorOutput "📊 Table: $($Module.Table)" -ForegroundColor $Blue
    
    # Test 1: Check table structure
    $startTime = Get-Date
    $structureUrl = "$BaseUrl/api/admin/departments/$Department/$($Module.Key)/structure"
    Write-ColorOutput "   📋 Checking structure: GET $structureUrl" -ForegroundColor $Yellow
    
    $structureResponse = Test-ApiEndpoint -Url $structureUrl -Method "GET"
    $duration = ((Get-Date) - $startTime).TotalMilliseconds
    
    if ($structureResponse.Success) {
        $moduleTest.Tests.Structure.Status = "passed"
        $moduleTest.Tests.Structure.Message = "Structure retrieved"
        $moduleTest.Tests.Structure.Duration = [math]::Round($duration)
        Write-ColorOutput "   ✅ Structure check passed ($([math]::Round($duration))ms)" -ForegroundColor $Green
    } else {
        $moduleTest.Tests.Structure.Status = "failed"
        $moduleTest.Tests.Structure.Message = "HTTP $($structureResponse.StatusCode) - $($structureResponse.Error)"
        $moduleTest.Tests.Structure.Duration = [math]::Round($duration)
        Write-ColorOutput "   ❌ Structure check failed: HTTP $($structureResponse.StatusCode)" -ForegroundColor $Red
    }
    
    # Test 2: Create dummy data
    $dummyData = $DummyDataTemplates[$Module.Key]
    if (-not $dummyData) {
        $dummyData = @{
            title = "Test $($Module.Name)"
            name = "Test $($Module.Name)"
            description = "Test data for $($Module.Name) module"
            created_at = (Get-Date).ToString("yyyy-MM-dd HH:mm:ss")
        }
    }
    
    $startTime = Get-Date
    $createUrl = "$BaseUrl/api/admin/departments/$Department/$($Module.Key)"
    Write-ColorOutput "   ➕ Creating record: POST $createUrl" -ForegroundColor $Yellow
    
    $createResponse = Test-ApiEndpoint -Url $createUrl -Method "POST" -Body $dummyData
    $duration = ((Get-Date) - $startTime).TotalMilliseconds
    
    if ($createResponse.Success) {
        $moduleTest.CreatedId = $createResponse.Data.id -or $createResponse.Data.insertId
        $moduleTest.Tests.Create.Status = "passed"
        $moduleTest.Tests.Create.Message = "Record created (ID: $($moduleTest.CreatedId))"
        $moduleTest.Tests.Create.Duration = [math]::Round($duration)
        Write-ColorOutput "   ✅ Create test passed ($([math]::Round($duration))ms) - ID: $($moduleTest.CreatedId)" -ForegroundColor $Green
    } else {
        $moduleTest.Tests.Create.Status = "failed"
        $moduleTest.Tests.Create.Message = "HTTP $($createResponse.StatusCode) - $($createResponse.Error)"
        $moduleTest.Tests.Create.Duration = [math]::Round($duration)
        Write-ColorOutput "   ❌ Create test failed: HTTP $($createResponse.StatusCode)" -ForegroundColor $Red
    }
    
    # Test 3: Read data back
    $startTime = Get-Date
    $readUrl = "$BaseUrl/api/admin/departments/$Department/$($Module.Key)"
    Write-ColorOutput "   👁️  Reading records: GET $readUrl" -ForegroundColor $Yellow
    
    $readResponse = Test-ApiEndpoint -Url $readUrl -Method "GET"
    $duration = ((Get-Date) - $startTime).TotalMilliseconds
    
    if ($readResponse.Success) {
        $records = $readResponse.Data
        if ($records -is [array]) {
            $recordCount = $records.Count
        } elseif ($records.data -is [array]) {
            $recordCount = $records.data.Count
        } else {
            $recordCount = 1
        }
        
        $moduleTest.Tests.Read.Status = "passed"
        $moduleTest.Tests.Read.Message = "Retrieved $recordCount records"
        $moduleTest.Tests.Read.Duration = [math]::Round($duration)
        Write-ColorOutput "   ✅ Read test passed ($([math]::Round($duration))ms) - $recordCount records" -ForegroundColor $Green
    } else {
        $moduleTest.Tests.Read.Status = "failed"
        $moduleTest.Tests.Read.Message = "HTTP $($readResponse.StatusCode) - $($readResponse.Error)"
        $moduleTest.Tests.Read.Duration = [math]::Round($duration)
        Write-ColorOutput "   ❌ Read test failed: HTTP $($readResponse.StatusCode)" -ForegroundColor $Red
    }
    
    # Test 4: Delete dummy data (if created successfully)
    if ($moduleTest.CreatedId) {
        $startTime = Get-Date
        $deleteUrl = "$BaseUrl/api/admin/departments/$Department/$($Module.Key)/$($moduleTest.CreatedId)"
        Write-ColorOutput "   🗑️  Deleting record: DELETE $deleteUrl" -ForegroundColor $Yellow
        
        $deleteResponse = Test-ApiEndpoint -Url $deleteUrl -Method "DELETE"
        $duration = ((Get-Date) - $startTime).TotalMilliseconds
        
        if ($deleteResponse.Success -or $deleteResponse.StatusCode -eq 204) {
            $moduleTest.Tests.Delete.Status = "passed"
            $moduleTest.Tests.Delete.Message = "Record deleted successfully"
            $moduleTest.Tests.Delete.Duration = [math]::Round($duration)
            Write-ColorOutput "   ✅ Delete test passed ($([math]::Round($duration))ms)" -ForegroundColor $Green
        } else {
            $moduleTest.Tests.Delete.Status = "failed"
            $moduleTest.Tests.Delete.Message = "HTTP $($deleteResponse.StatusCode) - $($deleteResponse.Error)"
            $moduleTest.Tests.Delete.Duration = [math]::Round($duration)
            Write-ColorOutput "   ❌ Delete test failed: HTTP $($deleteResponse.StatusCode)" -ForegroundColor $Red
        }
    } else {
        $moduleTest.Tests.Delete.Status = "skipped"
        $moduleTest.Tests.Delete.Message = "No record to delete (create failed)"
        Write-ColorOutput "   ⏭️  Delete test skipped (no record created)" -ForegroundColor $Yellow
    }
    
    # Calculate module test results
    $testCount = $moduleTest.Tests.Count
    $passedTests = ($moduleTest.Tests.Values | Where-Object { $_.Status -eq "passed" }).Count
    $failedTests = ($moduleTest.Tests.Values | Where-Object { $_.Status -eq "failed" }).Count
    $skippedTests = ($moduleTest.Tests.Values | Where-Object { $_.Status -eq "skipped" }).Count
    
    $moduleTest.Summary = @{
        Total = $testCount
        Passed = $passedTests
        Failed = $failedTests
        Skipped = $skippedTests
        Success = ($failedTests -eq 0)
    }
    
    Write-ColorOutput "   📊 Module Summary: $passedTests/$testCount tests passed" -ForegroundColor $Blue
    
    return $moduleTest
}

# Main test execution
Write-ColorOutput "🚀 AIML Admin Dashboard - Module Testing Script" -ForegroundColor $Cyan
Write-ColorOutput "===============================================" -ForegroundColor $Cyan
Write-ColorOutput "📍 Base URL: $BaseUrl" -ForegroundColor $Blue
Write-ColorOutput "🎯 Department: $Department" -ForegroundColor $Blue
Write-ColorOutput "📊 Total Modules: $($AimlModules.Count)" -ForegroundColor $Blue
Write-ColorOutput "===============================================`n" -ForegroundColor $Cyan

$startTime = Get-Date
$TestResults.Total = $AimlModules.Count

for ($i = 0; $i -lt $AimlModules.Count; $i++) {
    $module = $AimlModules[$i]
    Write-ColorOutput "`n[$($i + 1)/$($AimlModules.Count)] Testing $($module.Name)..." -ForegroundColor $Blue
    
    try {
        $moduleResult = Test-AimlModule -Module $module
        $TestResults.Details += $moduleResult
        
        if ($moduleResult.Summary.Success) {
            $TestResults.Passed++
        } else {
            $TestResults.Failed++
        }
    }
    catch {
        Write-ColorOutput "   ❌ Module test failed with error: $($_.Exception.Message)" -ForegroundColor $Red
        $TestResults.Failed++
        $TestResults.Details += @{
            Module = $module.Name
            Key = $module.Key
            Table = $module.Table
            Error = $_.Exception.Message
            Summary = @{ Success = $false }
        }
    }
    
    # Small delay between tests
    Start-Sleep -Milliseconds 500
}

$totalDuration = ((Get-Date) - $startTime).TotalSeconds

# Print final summary
Write-ColorOutput "`n$('=' * 80)" -ForegroundColor $Cyan
Write-ColorOutput "📋 FINAL TEST SUMMARY" -ForegroundColor $Cyan
Write-ColorOutput "$('=' * 80)" -ForegroundColor $Cyan
Write-ColorOutput "⏱️  Total Duration: $([math]::Round($totalDuration, 2))s" -ForegroundColor $Blue
Write-ColorOutput "📊 Total Modules: $($TestResults.Total)" -ForegroundColor $Blue
Write-ColorOutput "✅ Passed: $($TestResults.Passed)" -ForegroundColor $Green
Write-ColorOutput "❌ Failed: $($TestResults.Failed)" -ForegroundColor $Red
Write-ColorOutput "⏭️  Skipped: $($TestResults.Skipped)" -ForegroundColor $Yellow
$successRate = [math]::Round(($TestResults.Passed / $TestResults.Total) * 100, 1)
Write-ColorOutput "🎯 Success Rate: $successRate%" -ForegroundColor $Blue

# Print detailed results
Write-ColorOutput "`n📝 DETAILED RESULTS:" -ForegroundColor $Cyan
Write-ColorOutput "$('-' * 80)" -ForegroundColor $Cyan

for ($i = 0; $i -lt $TestResults.Details.Count; $i++) {
    $result = $TestResults.Details[$i]
    $status = if ($result.Summary.Success) { "[PASS]" } else { "[FAIL]" }
    $color = if ($result.Summary.Success) { $Green } else { $Red }
    
    Write-ColorOutput "$($i + 1). $($result.Module) ($($result.Key)) - $status" -ForegroundColor $color
    
    if ($result.Tests) {
        foreach ($testEntry in $result.Tests.GetEnumerator()) {
            $testName = $testEntry.Key
            $testResult = $testEntry.Value
            $statusIcon = switch ($testResult.Status) {
                "passed" { "[PASS]" }
                "failed" { "[FAIL]" }
                "skipped" { "[SKIP]" }
                default { "[UNKNOWN]" }
            }
            $duration = if ($testResult.Duration) { " ($($testResult.Duration)ms)" } else { "" }
            Write-Host "   $statusIcon $testName : $($testResult.Message)$duration"
        }
    }
    
    if ($result.Error) {
        Write-ColorOutput "   ❌ Error: $($result.Error)" -ForegroundColor $Red
    }
    Write-Host ""
}

# Print failed modules summary
$failedModules = $TestResults.Details | Where-Object { -not $_.Summary.Success }
if ($failedModules.Count -gt 0) {
    Write-ColorOutput "❌ FAILED MODULES:" -ForegroundColor $Red
    Write-ColorOutput "$('-' * 40)" -ForegroundColor $Red
    foreach ($module in $failedModules) {
        Write-ColorOutput "• $($module.Module) ($($module.Key))" -ForegroundColor $Red
        if ($module.Table) {
            Write-ColorOutput "  Table: $($module.Table)" -ForegroundColor $Red
        }
    }
    Write-Host ""
}

# Print recommendations
Write-ColorOutput "💡 RECOMMENDATIONS:" -ForegroundColor $Yellow
Write-ColorOutput "$('-' * 40)" -ForegroundColor $Yellow
Write-ColorOutput "• Check API endpoints are running on $BaseUrl" -ForegroundColor $Yellow
Write-ColorOutput "• Verify database tables exist and have proper schema" -ForegroundColor $Yellow
Write-ColorOutput "• Ensure proper authentication if required" -ForegroundColor $Yellow
Write-ColorOutput "• Check network connectivity and firewall settings" -ForegroundColor $Yellow
Write-ColorOutput "• Review server logs for detailed error information" -ForegroundColor $Yellow

if ($failedModules.Count -eq 0) {
    Write-ColorOutput "`n🎉 All tests passed! AIML admin dashboard is working correctly." -ForegroundColor $Green
    exit 0
} else {
    Write-ColorOutput "`n⚠️  Some tests failed. Please check the issues above." -ForegroundColor $Red
    exit 1
}