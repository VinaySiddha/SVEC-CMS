# Auto-Refresh Quick Reference Guide

## Location in Dashboard

**Where to find it:** Table header controls (CardHeader section)
- Located next to the search bar
- Below the "Add New Record" button
- Separated by a left border divider

## How to Use

### Enable Auto-Refresh
1. Click the **"Auto-Refresh Off"** button (gray outline)
2. Button turns green and text changes to **"Auto-Refresh On"**
3. RotateCw icon begins to spin
4. Interval selector dropdown appears
5. Countdown badge appears showing next refresh time

### Change Refresh Interval
1. Click the dropdown menu (appears when auto-refresh is ON)
2. Select desired interval:
   - **5s** - Very frequent updates (high network usage)
   - **10s** - Frequent updates (medium network usage)
   - **30s** - Standard refresh (low network usage) *DEFAULT*
   - **1m** - Minimal updates (very low network usage)
   - **5m** - Hourly-like updates (minimal network usage)
3. Timer resets and countdown updates immediately

### Disable Auto-Refresh
1. Click the **"Auto-Refresh On"** button (green)
2. Button returns to gray outline
3. Text changes to "Auto-Refresh Off"
4. Icon stops spinning
5. Interval selector and countdown disappear
6. Data no longer auto-refreshes

## Visual Indicators

### When OFF
```
[🔄 Auto-Refresh Off]
```

### When ON
```
[🔄 Auto-Refresh On] [30s ▼] [✓ Next: 28s]
```

## What Happens

| Action | Behavior |
|--------|----------|
| Enable auto-refresh | Immediate first refresh, then every N seconds |
| Change interval | Current timer stops, new timer starts with new interval |
| Switch module | Auto-refresh continues on new module |
| Change page | Auto-refresh continues, refreshes new page data |
| Disable auto-refresh | Timer stops immediately, data no longer refreshes |
| Close browser tab | Timer stops, no background requests |

## Helpful Tips

✅ **Best Practices**
- Use 30s interval for typical monitoring
- Use 5-10s interval only for critical real-time needs
- Use 1-5m interval for background monitoring
- Disable when not actively viewing dashboard

❌ **Avoid**
- Don't use 5s interval for extended periods (high network load)
- Don't leave auto-refresh on multiple tabs (cumulative traffic)
- Don't assume data changed just because of refresh (check timestamps)

## Common Scenarios

### Monitor New Data Entry
1. Enable auto-refresh with 10s interval
2. Have user add records in separate tab
3. New records appear automatically
4. Disable when done testing

### Real-Time Dashboard Monitoring
1. Enable auto-refresh with 30s interval (default)
2. Sit back and watch data updates
3. Use interval selector to adjust as needed

### Low-Bandwidth Environment
1. Enable auto-refresh with 5m interval
2. Data updates less frequently
3. Reduces network overhead
4. Still provides periodic updates

### Verify Data Consistency
1. Enable auto-refresh with 30s interval
2. Make changes in another system
3. Verify changes appear in dashboard
4. Confirm data synchronization

## Countdown Explained

The green badge shows: **Next: 28s**

This means:
- Current time to next automatic refresh: 28 seconds
- Counts down: 28s → 27s → 26s ... → 1s → 0s → refresh! → resets
- Updates every second for accuracy

## Performance Note

Each refresh makes an API call. With auto-refresh enabled:
- **5s interval** ≈ 720 calls/hour per user
- **10s interval** ≈ 360 calls/hour per user
- **30s interval** ≈ 120 calls/hour per user (recommended)
- **1m interval** ≈ 60 calls/hour per user
- **5m interval** ≈ 12 calls/hour per user

Choose appropriately based on your use case!

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Button doesn't turn green | Check if module is selected (not on main dashboard) |
| Countdown doesn't show | Make sure auto-refresh is enabled and dropdown changed |
| Data not updating | Check network in DevTools F12 → Network tab |
| High CPU usage | Switch to longer interval (30s or 1m) |
| Button disappeared | Scroll right or resize browser window |

## Keyboard Shortcuts

Currently no keyboard shortcuts. You must:
- Click button to toggle
- Use dropdown to change interval

*Future enhancement: Consider adding keyboard shortcuts in next release*

---

**Last Updated**: 2025-01-17
**Version**: 1.0 - Initial Release
