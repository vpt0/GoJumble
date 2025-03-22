package io.gojumble.ui.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.size
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.hapticfeedback.HapticFeedbackType
import androidx.compose.ui.platform.LocalHapticFeedback
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import io.gojumble.ui.theme.CorrectGreen

enum class LetterState {
    IDLE, SELECTED, CORRECT, HINT
}

@Composable
fun LetterTile(
    letter: Char,
    state: LetterState = LetterState.IDLE,
    onClick: () -> Unit = {}
) {
    val haptic = LocalHapticFeedback.current

    val backgroundColor = when (state) {
        LetterState.IDLE -> MaterialTheme.colorScheme.surface
        LetterState.SELECTED -> MaterialTheme.colorScheme.primary.copy(alpha = 0.2f)
        LetterState.CORRECT -> CorrectGreen.copy(alpha = 0.2f)
        LetterState.HINT -> MaterialTheme.colorScheme.tertiary.copy(alpha = 0.2f)
    }

    val borderColor = when (state) {
        LetterState.IDLE -> Color.White.copy(alpha = 0.1f)
        LetterState.SELECTED -> MaterialTheme.colorScheme.primary
        LetterState.CORRECT -> CorrectGreen
        LetterState.HINT -> MaterialTheme.colorScheme.tertiary
    }

    val scale by animateFloatAsState(
        targetValue = if (state == LetterState.SELECTED) 1.05f else 1f,
        label = "letterScale"
    )

    Box(
        modifier = Modifier
            .size(56.dp)
            .scale(scale)
            .clip(MaterialTheme.shapes.medium)
            .background(backgroundColor)
            .border(
                width = 2.dp,
                color = borderColor,
                shape = MaterialTheme.shapes.medium
            )
            .clickable {
                haptic.performHapticFeedback(HapticFeedbackType.TextHandleMove)
                onClick()
            },
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = letter.toString().uppercase(),
            style = MaterialTheme.typography.headlineMedium.copy(
                fontWeight = FontWeight.Bold,
                fontSize = 24.sp
            ),
            color = MaterialTheme.colorScheme.onSurface
        )
    }
}