import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import org.jetbrains.compose.web.dom.*
import org.jetbrains.compose.web.renderComposable

fun main() {
    renderComposable("root") {
        val (count, setCount) = remember {
            mutableStateOf(0)
        }
        Div {
            Button(
                attrs = {
                    onClick {
                        setCount(count + 1)
                    }
                }
            ) {
                Text("+")
            }
            P {
                Text(count.toString())
            }
            Button(
                attrs = {
                    onClick {
                        setCount(count - 1)
                    }
                }
            ) {
                Text("-")
            }
        }
    }
}
