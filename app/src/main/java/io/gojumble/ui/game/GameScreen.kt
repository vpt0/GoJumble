package io.gojumble.ui.game

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Info
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import io.gojumble.ui.components.GlassCard
import io.gojumble.ui.components.GoJumbleButton
import io.gojumble.ui.components.LetterState
import io.gojumble.ui.components.LetterTile

@Composable
fun GameScreen(
    modifier: Modifier = Modifier
) {
    // This would come from ViewModel in the real implementation
    var currentWord by remember { mutableStateOf("PUZZLE") }
    var jumbledWord by remember { mutableStateOf(currentWord.toCharArray().apply { shuffle() }.joinToString("")) }
    var userAnswer by remember { mutableStateOf("") }
    var isCorrect by remember { mutableStateOf(false) }
    var showHint by remember { mutableStateOf(false) }

    Box(
        modifier = modifier
            .fillMaxSize()
            .background(MaterialTheme.colorScheme.background)
            .padding(16.dp)
    ) {
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            // Game header
            GameHeader(
                roundNumber = 1,
                totalRounds = 10,
                timeRemaining = 30
            )

            Spacer(modifier = Modifier.height(24.dp))

            // Game area
            GlassCard(
                modifier = Modifier.fillMaxWidth()
            ) {
                Column(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "Unscramble the word",
                        style = MaterialTheme.typography.headlineSmall,
                        color = MaterialTheme.colorScheme.onSurface
                    )

                    Spacer(modifier = Modifier.height(24.dp))

                    // User answer area
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(60.dp)
                            .background(
                                color = MaterialTheme.colorScheme.surface.copy(alpha = 0.5f),
                                shape = MaterialTheme.shapes.medium
                            )
                            .padding(horizontal = 4.dp),
                        horizontalArrangement = Arrangement.Center,
                        verticalAlignment = Alignment.CenterVertically
                    ) {
                        userAnswer.forEachIndexed { index, char ->
                            LetterTile(
                                letter = char,
                                state = if (isCorrect) LetterState.CORRECT else LetterState.SELECTED,
                                onClick = {
                                    if (!isCorrect) {
                                        userAnswer = userAnswer.removeRange(index, index + 1)
                                    }
                                }
                            )
                            if (index < userAnswer.length - 1) {
                                Spacer(modifier = Modifier.width(4.dp))
                            }
                        }

                        // Empty slots
                        repeat(currentWord.length - userAnswer.length) {
                            Box(
                                modifier = Modifier
                                    .size(56.dp)
                                    .clip(MaterialTheme.shapes.medium)
                                    .background(Color.White.copy(alpha = 0.05f))
                                    .border(
                                        width = 1.dp,
                                        color = Color.White.copy(alpha = 0.1f),
                                        shape = MaterialTheme.shapes.medium
                                    )
                            )
                            if (it < currentWord.length - userAnswer.length - 1) {
                                Spacer(modifier = Modifier.width(4.dp))
                            }
                        }
                    }

                    Spacer(modifier = Modifier.height(24.dp))

                    // Jumbled letters
                    Row(
                        modifier = Modifier.fillMaxWidth(),
                        horizontalArrangement = Arrangement.Center
                    ) {
                        jumbledWord.forEachIndexed { index, char ->
                            val isUsed = userAnswer.count { it == char } >=
                                    jumbledWord.count { it == char } -
                                    userAnswer.count { it == char }

                            if (!isUsed) {
                                LetterTile(
                                    letter = char,
                                    state = if (showHint && currentWord[0] == char) LetterState.HINT else LetterState.IDLE,
                                    onClick = {
                                        if (userAnswer.length < currentWord.length && !isCorrect) {
                                            userAnswer += char

                                            // Check if answer is correct
                                            if (userAnswer == currentWord) {
                                                isCorrect = true
                                            }
                                        }
                                    }
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                            } else {
                                // Placeholder for used letters
                                Box(
                                    modifier = Modifier
                                        .size(56.dp)
                                        .clip(MaterialTheme.shapes.medium)
                                        .background(Color.Transparent)
                                )
                                Spacer(modifier = Modifier.width(4.dp))
                            }
                        }
                    }
                }
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Game controls
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceEvenly
            ) {
                // Hint button
                IconButton(
                    onClick = { showHint = true },
                    modifier = Modifier
                        .size(56.dp)
                        .clip(CircleShape)
                        .background(MaterialTheme.colorScheme.tertiary)
                ) {
                    Icon(
                        imageVector = Icons.Filled.Info,
                        contentDescription = "Hint",
                        tint = MaterialTheme.colorScheme.onTertiary
                    )
                }

                // Skip button
                GoJumbleButton(
                    text = "Skip",
                    onClick = {
                        // Reset for next word
                        currentWord = "JUMBLE" // This would come from ViewModel
                        jumbledWord = currentWord.toCharArray().apply { shuffle() }.joinToString("")
                        userAnswer = ""
                        isCorrect = false
                        showHint = false
                    }
                )
            }
        }

        // Success message
        AnimatedVisibility(
            visible = isCorrect,
            enter = fadeIn(animationSpec = tween(300)),
            exit = fadeOut(animationSpec = tween(300)),
            modifier = Modifier.align(Alignment.Center)
        ) {
            GlassCard(
                modifier = Modifier.padding(32.dp)
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally
                ) {
                    Text(
                        text = "Correct!",
                        style = MaterialTheme.typography.displaySmall,
                        color = MaterialTheme.colorScheme.onSurface
                    )

                    Spacer(modifier = Modifier.height(16.dp))

                    GoJumbleButton(
                        text = "Next Word",
                        onClick = {
                            // Reset for next word
                            currentWord = "JUMBLE" // This would come from ViewModel
                            jumbledWord = currentWord.toCharArray().apply { shuffle() }.joinToString("")
                            userAnswer = ""
                            isCorrect = false
                            showHint = false
                        }
                    )
                }
            }
        }
    }
}

@Composable
fun GameHeader(
    roundNumber: Int,
    totalRounds: Int,
    timeRemaining: Int
) {
    Row(
        modifier = Modifier.fillMaxWidth(),
        horizontalArrangement = Arrangement.SpaceBetween,
        verticalAlignment = Alignment.CenterVertically
    ) {
        // Round counter
        GlassCard {
            Text(
                text = "Round $roundNumber/$totalRounds",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurface
            )
        }

        // Timer
        GlassCard {
            Text(
                text = "$timeRemaining",
                style = MaterialTheme.typography.headlineMedium,
                color = MaterialTheme.colorScheme.onSurface,
                textAlign = TextAlign.Center
            )
        }

        // Score
        GlassCard {
            Text(
                text = "Score: 150",
                style = MaterialTheme.typography.bodyMedium,
                color = MaterialTheme.colorScheme.onSurface
            )
        }
    }
}