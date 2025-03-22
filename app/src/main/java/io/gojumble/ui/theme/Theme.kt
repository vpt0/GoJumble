package io.gojumble.ui.theme

import android.app.Activity
import android.os.Build
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.dynamicDarkColorScheme
import androidx.compose.material3.dynamicLightColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.SideEffect
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.platform.LocalView
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import androidx.core.view.WindowCompat

// Custom spacing system
data class Spacing(
    val default: Dp = 0.dp,
    val extraSmall: Dp = 4.dp,
    val small: Dp = 8.dp,
    val medium: Dp = 16.dp,
    val large: Dp = 24.dp,
    val extraLarge: Dp = 32.dp,
    val huge: Dp = 48.dp
)

// Custom radius system
data class Radius(
    val small: Dp = 8.dp,
    val medium: Dp = 16.dp,
    val large: Dp = 20.dp,
    val extraLarge: Dp = 24.dp
)

// Create composition locals for our custom design system elements
val LocalSpacing = staticCompositionLocalOf { Spacing() }
val LocalRadius = staticCompositionLocalOf { Radius() }

// Updated Dark color scheme (our primary theme)
private val DarkColorScheme = darkColorScheme(
    primary = Purple,
    onPrimary = OffWhite,
    secondary = Teal,
    onSecondary = OffWhite,
    tertiary = Blue,
    onTertiary = OffWhite,
    background = DarkBackground,
    surface = DarkSurface,
    onBackground = OffWhite,
    onSurface = OffWhite
)

// Updated Light color scheme (alternative theme)
private val LightColorScheme = lightColorScheme(
    primary = Purple,
    onPrimary = OffWhite,
    secondary = Teal,
    onSecondary = OffWhite,
    tertiary = Blue,
    onTertiary = OffWhite,
    background = LightSurface,
    surface = LightSurface,
    onBackground = DarkText,
    onSurface = DarkText
)

@Composable
fun GoJumbleTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    // Dynamic color is available on Android 12+
    dynamicColor: Boolean = false, // Set to false to use our custom colors
    content: @Composable () -> Unit
) {
    val colorScheme = when {
        dynamicColor && Build.VERSION.SDK_INT >= Build.VERSION_CODES.S -> {
            val context = LocalContext.current
            if (darkTheme) dynamicDarkColorScheme(context) else dynamicLightColorScheme(context)
        }
        darkTheme -> DarkColorScheme
        else -> LightColorScheme
    }

    // Set system bars color
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = colorScheme.background.toArgb()
            WindowCompat.getInsetsController(window, view).isAppearanceLightStatusBars = !darkTheme
        }
    }

    CompositionLocalProvider(
        LocalSpacing provides Spacing(),
        LocalRadius provides Radius()
    ) {
        MaterialTheme(
            colorScheme = colorScheme,
            typography = Typography,
            content = content
        )
    }
}

// Extension properties for easier access to our custom design system
val MaterialTheme.spacing: Spacing
    @Composable
    get() = LocalSpacing.current

val MaterialTheme.radius: Radius
    @Composable
    get() = LocalRadius.current